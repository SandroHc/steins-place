from io import BytesIO
from PIL import Image
import requests

response = requests.get("https://raw.githubusercontent.com/sandrohc/r-steins-place/master/reference.png")
img = Image.open(BytesIO(response.content))
img = img.resize((img.size[0] * 3, img.size[1] * 3), Image.NEAREST)

mask_url = "https://raw.githubusercontent.com/sandrohc/r-steins-place/master/mask.png"
response = requests.get(mask_url)
mask_i = Image.open(BytesIO(response.content))
mask = Image.new("1", (3000, 3000), 0)
mask.paste(mask_i)

tl = (1499 * 3, 3 * 3)  # top left corner

unmasked_img = Image.new('RGBA', (3000, 3000))
unmasked_img.paste(img, tl)
final_img = Image.new('RGBA', (3000, 3000))
final_img = Image.composite(final_img, unmasked_img, mask)
final_img.save("overlay.png")
