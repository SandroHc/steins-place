// ==UserScript==
// @name         Steins;Place 2023
// @namespace    http://tampermonkey.net/
// @version      4
// @description  Steins;Place overlay for r/place 2023.
// @author       SandroHc
// @match        https://garlic-bread.reddit.com/embed*
// @downloadURL  https://r-steins-place.pages.dev/overlay.js
// @updateURL    https://r-steins-place.pages.dev/overlay.js
// @icon         https://r-steins-place.pages.dev/favicon.png
// @grant        none
// @license      MIT
// ==/UserScript==

const overlay = "https://r-steins-place.pages.dev/overlay.png?tstamp=" + Math.floor(Date.now() / 10000);
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