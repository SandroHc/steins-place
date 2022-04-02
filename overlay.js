// ==UserScript==
// @name         r/SteinsPlace overlay
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Overlay for the r/SteinsPlace!
// @author       SandroHc
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// @license      MIT
// ==/UserScript==

const overlay = "https://raw.githubusercontent.com/sandrohc/r-steins-place/master/overlay.png?tstamp=" + Math.floor(Date.now() / 10000);

if (window.top !== window.self) {
    window.addEventListener('load', () => {
        const canvas = document.getElementsByTagName("mona-lisa-embed")[0].shadowRoot.children[0].getElementsByTagName("mona-lisa-canvas")[0].shadowRoot.children[0];
        canvas.appendChild(
            (function () {
                const i = document.createElement("img");
                i.id = "custom-overlay";
                i.src = overlay;
                i.style = "position: absolute;left: 0;top: 0;image-rendering: pixelated;width: 2000px;height: 1000px;";
                console.log("Placing overlay for:", i.src);
                return i;
            })()
        )
    }, false);
}