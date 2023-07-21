// ==UserScript==
// @name         Steins;Place 2023
// @namespace    http://tampermonkey.net/
// @version      3
// @description  Steins;Place overlay for r/place 2023.
// @author       SandroHc
// @match        https://garlic-bread.reddit.com/embed*
// @downloadURL  https://raw.githubusercontent.com/SandroHc/r-steins-place/master/overlay.js
// @updateURL    https://raw.githubusercontent.com/SandroHc/r-steins-place/master/overlay.js
// @icon         https://raw.githubusercontent.com/SandroHc/r-steins-place/master/favicon.png
// @grant        none
// @license      MIT
// ==/UserScript==

const overlay = "https://raw.githubusercontent.com/sandrohc/r-steins-place/master/overlay.png?tstamp=" + Math.floor(Date.now() / 10000);
console.log("[PLACE] Placing overlay for Steins;Place:", overlay);

if (window.top !== window.self) {
    const overlay_img = document.createElement("img");
    overlay_img.src = overlay;
    overlay_img.style = "position: absolute;left: 0;top: 0;image-rendering: pixelated;width: 2000px;height: 2000px;";

    window.addEventListener('load', () => {
        const canvas = document.getElementsByTagName('garlic-bread-embed')[0]
            .shadowRoot.children[0]
            .getElementsByTagName('garlic-bread-share-container')[0]
            .getElementsByTagName('garlic-bread-camera')[0]
            .getElementsByTagName('garlic-bread-canvas')[0]
            .shadowRoot.children[0];

        console.log("[PLACE] Placing on canvas:", canvas);
        canvas.appendChild(overlay_img);
    }, false);
}