# r/SteinsPlace overlay

Hello! This is the code to generate the [Steins;Place](https://discord.gg/nAqaXhpafP) overlay.

## Quick links

- https://www.reddit.com/r/place/?cx=244&cy=16&px=50&jsontemplate=https://rentry.co/SteinsPlace/raw
- https://rentry.co/SteinsPlaceOverlay (elpsykongroooperationelysian)
- https://r-steins-place.pages.dev
- https://r-steins-place.pages.dev/overlay.json

## Updating the overlay

1. Update `reference.png`
2. Update x/y offsets on `sync_overlay.py`
3. Update x/y offsets on `index.html`
4. Update x/y offsets on `overlay.json` (with offset!)
5. Run `python .\sync_overlay.py`

## Local setup

1. Install Python 3
2. Install Pillow module - `python -m pip install pillow`
