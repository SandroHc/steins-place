// ==UserScript==
// @name         SuperStonk rplace autoclicker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  support clicking
// @author       halfdane
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// @updateURL    https://rplacesuperstonk.github.io/rplace-image/autoclicker.user.js
// @downloadURL  https://rplacesuperstonk.github.io/rplace-image/autoclicker.user.js
// ==/UserScript==

const X_OFFSET = 773
const Y_OFFSET = 735

async function run() {
    const debug=true;
    const g = (e, t) =>
        new CustomEvent(e, {
            composed: !0,
            bubbles: !0,
            cancelable: !0,
            detail: t,
        });

    function sleep(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }

    const colors = {
        2:  "#FF4500",
        3:  "#FFA800",
        4:  "#FFD635",
        6:  "#00A368",
        8:  "#7EED56",
        12: "#2450A4",
        13: "#3690EA",
        14: "#51E9F4",
        18: "#811E9F",
        19: "#B44AC0",
        23: "#FF99AA",
        25: "#9C6926",
        27: "#000000",
        29: "#898D90",
        30: "#D4D7D9",
        31: "#FFFFFF",
    };
    for (const [k, v] of Object.entries(colors)) {
        colors[v] = k;
    }

    async function get_template_ctx(){
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const template_canvas = document.createElement("canvas");
                template_canvas.width = img.width;
                template_canvas.height = img.height;
                const template_ctx = template_canvas.getContext("2d");
                template_ctx.drawImage(img, 0, 0);
                resolve({template_ctx: template_ctx, template_img: img})
            }
            img.onerror = reject
            img.src = "https://raw.githubusercontent.com/rplacesuperstonk/rplace-image/main/reference.png?tstamp=" + Math.floor(Date.now() / 10000);
        })
    }

    function getPixel(ctx, x, y) {
        const pixel = ctx.getImageData(x, y, 1, 1);
        const data = pixel.data;
        return (
            ("#" + data[0].toString(16).padStart(2, 0) + data[1].toString(16).padStart(2, 0) + data[2].toString(16).padStart(2, 0)).toUpperCase()
        );
    }

    async function setPixel(canvas, x, y, color) {
        canvas.dispatchEvent(g("click-canvas", { x, y }));
        await sleep(1_000+ Math.floor(Math.random() * 1_000));
        canvas.dispatchEvent(g("select-color", { color: 1*colors[color] }));
        await sleep(1_000+ Math.floor(Math.random() * 1_000));
        if (!debug){
            canvas.dispatchEvent(g("confirm-pixel"));
        }
    }

    await sleep(5_000);

    while (true) {
        console.log("running");
        let edited = false;
        try{
            const {template_ctx, template_img} = await get_template_ctx();

            const ml = document.querySelector("mona-lisa-embed");
            const canvas = ml.shadowRoot.querySelector("mona-lisa-canvas").shadowRoot.querySelector("div > canvas")
            const ctx = canvas.getContext('2d');
            const errors = []
            for (let x = 0; x < template_img.width; x++) {
                for (let y = 0; y < template_img.height; y++) {
                    let correct = getPixel(template_ctx, x, y);
                    let actual = getPixel(ctx, x+X_OFFSET, y+Y_OFFSET);
                    if (actual !== correct) {
                        errors.push({x: x, y: y, correct: correct, actual: actual});
                    }
                }
            }

            if (errors.length > 0) {
                var e = errors[Math.floor(Math.random()*errors.length)];

                console.log("(%s / %s) is %c%s%c but should be %c%s", e.x, e.y,
                    "background:"+e.actual, e.actual, "background:inherit;",
                    "background:"+e.correct, e.correct
                )

                await setPixel(canvas, e.x + X_OFFSET, e.y + Y_OFFSET, e.correct);
                if (!debug){
                    edited = true;
                }
            }

        } catch (error){
            console.log("ignoring", error);
        } finally {
            let timeout;
            if (edited) {
                timeout = 1_000 * 60 * 5 + 5_000 + Math.floor(Math.random() * 15_000);
            } else {
                timeout =Math.floor(Math.random() * 5_000);
            }
            if (debug){
                timeout = 1;
            }
            console.log("sleeping for ", timeout);
            await sleep(timeout);
        }
    }
}

window.addEventListener('load', run);

