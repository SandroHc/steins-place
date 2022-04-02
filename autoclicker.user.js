// ==UserScript==
// @name         SuperStonk rplace autoclicker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the canvas!
// @author       oralekin
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==



async function run() {
    console.log("run");
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
        2: "#FF450",
        3: "#FFA80",
        4: "#FFD635",
        6: "#0A368",
        8: "#7EED56",
        12: "#2450A4",
        13: "#3690EA",
        14: "#51E9F4",
        18: "#811E9F",
        19: "#B44AC0",
        23: "#FF99AA",
        25: "#9C6926",
        27: "#000",
        29: "#898D90",
        30: "#D4D7D9",
        31: "#FFFFFF",
    };
    for (const [k, v] of Object.entries(colors)) {
        colors[v] = k;
    }

    let template_data
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        var template_canvas = document.createElement("canvas");
        template_canvas.width = img.width;
        template_canvas.height = img.height;
        var template_ctx = template_canvas.getContext("2d");
        template_ctx.drawImage(img, 0, 0);
        template_data = template_ctx.getImageData(0,0, img.width, img.height).data;

        console.log(img.width, img.height, template_data);
    }
    const time = Math.floor(Date.now() / 10000);
    img.src = "https://raw.githubusercontent.com/rplacesuperstonk/rplace-image/main/reference.png?tstamp=" + time;

    function getPixel(data, x, y) {
        const index = y*img.width + x
        return (
            ("#" + data[index].toString(16) + data[index+1].toString(16) + data[index + 2].toString(16)).toUpperCase()
        );
    }

    async function setPixel(canvas, x, y, color) {
        canvas.dispatchEvent(g("click-canvas", { x, y }));
        await sleep(1_000+ Math.floor(Math.random() * 1_000));
        canvas.dispatchEvent(g("select-color", { color: 1*colors[color] }));
        await sleep(1_000+ Math.floor(Math.random() * 1_000));
        //canvas.dispatchEvent(g("confirm-pixel"));
    }

    await sleep(10_000);

    while (true) {
        console.log("running");
        let edited = false;
        try{
            let ml = document.querySelector("mona-lisa-embed");
            let canvas = ml.shadowRoot.querySelector("mona-lisa-canvas").shadowRoot.querySelector("div > canvas")
            var ctx = canvas.getContext('2d');
            var imageData = ctx.getImageData(773, 735, img.width, img.height);
            const data = imageData.data;
            for (let x = 0; x < img.width && !edited; x++) {
                for (let y = 0; y < img.height; y++) {
                    let correct = getPixel(template_data, x, y);
                    let actual = getPixel(data, x, y);
                    console.log(x, y, correct, actual);
                    if (actual !== correct) {
                        edited = true;
                        await setPixel(canvas, x + 773, y + 735, correct);
                        break;
                    }
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
            //console.log("sleeping for ", timeout);
            await sleep(100);
        }
    }
}

window.addEventListener('load', run);

