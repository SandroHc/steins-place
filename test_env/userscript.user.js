// ==UserScript==
// @name         SuperStonk Logo template
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the canvas!
// @author       oralekin
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==
if (window.top !== window.self) {
    window.addEventListener('load', () => {
            document.getElementsByTagName("mona-lisa-embed")[0].shadowRoot.children[0].getElementsByTagName("mona-lisa-canvas")[0].shadowRoot.children[0].appendChild(
        (function () {
            const i = document.createElement("img");
            const time = Math.floor(Date.now() / 10000);
            i.src = "https://raw.githubusercontent.com/rplacesuperstonk/rplace-image/main/test_env/superstonk_overlay.png?tstamp=" + time;
            i.style = "position: absolute;left: 0;top: 0;image-rendering: pixelated;width: 1000px;height: 1000px;";
            console.log(i);
            return i;
        })())

    }, false);

}
