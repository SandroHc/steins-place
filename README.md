# r/SteinsPlace overlay

Hello! This is the code to generate the [Steins;Place](https://discord.gg/nAqaXhpafP) overlay.

## Quick links

- https://discord.gg/nAqaXhpafP
- https://r-steins-place.pages.dev
- https://r-steins-place.pages.dev/overlay.json
- https://new.reddit.com/r/place/?cx=244&cy=16&px=57&screenmode=fullscreen&jsontemplate=https%3A%2F%2Fr-steins-place.pages.dev%2Foverlay.json

## Installing the overlay

The overlay will allow you to preview what pixels should come where, directly on the canvas.

1. Install a script manager, [such as Tampermonkey](https://tampermonkey.net/#download) (Chrome, Edge or Opera), or [Violentmonkey](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/) (Firefox). Android users can use [Kiwi Browser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser) and install the script as usual.

2. Install the "Template Manager" userscript: https://github.com/osuplace/templateManager/raw/main/dist/templateManager.user.js
3. Go to https://new.reddit.com/r/place/?cx=244&cy=16&px=57&screenmode=fullscreen&jsontemplate=https%3A%2F%2Fr-steins-place.pages.dev%2Foverlay.json

Now the canvas should work and display something like this (big img): https://imgur.com/Zv3rwy7.png

**IF YOUR OVERLAY WORKS, YOU'RE DONE!**

**IF NOT, PLEASE CONTINUE READING**

HOWEVER, IF YOU DO STEP 4 AND 5 YOU WON'T HAVE TO KEEP USING THE LINK IN STEP 3 TO OPEN THE PLACE CANVAS SO IT IS HIGHLY RECOMMENDED TO DO THEM AS WELL

4. Open r/Place and look for this icon (small img), click it: https://imgur.com/zjZoIRW.png
5. In the template URL you should fill in, after that click on the "Always load" button next to it: https://r-steins-place.pages.dev/overlay.json

## Updating the overlay

1. Update `reference.png`
2. Update x/y offsets on `overlay.json`
(Optional)
3. Update x/y offsets on `sync_overlay.py` (using the formula x+1000, y+1000)
4. Update x/y offsets on `index.html`
5. Update x/y offsets on `overlay.json` (using the formula x+1000, y+1000)
6. Run `python .\sync_overlay.py`

## Local setup

1. Install Python 3
2. Install Pillow module - `python -m pip install pillow`
