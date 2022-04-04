from io import BytesIO
from PIL import Image

canvas_width = 2000
canvas_height = 2000
canvas_scale = 3

print('Preparing reference-nixie-tubes.png')
nixie_tubes_pos = (1182 * canvas_scale, 23 * canvas_scale)  # top left corner
nixie_tubes_img = open("reference-nixie-tubes.png", "rb").read()
nixie_tubes_img = Image.open(BytesIO(nixie_tubes_img))
nixie_tubes_img = nixie_tubes_img.resize((nixie_tubes_img.size[0] * canvas_scale, nixie_tubes_img.size[1] * canvas_scale), Image.Resampling.NEAREST)

print('Preparing reference-okabe.png')
okabe_pos = (490 * canvas_scale, 1879 * canvas_scale)  # top left corner
okabe_img = open("reference-okabe.png", "rb").read()
okabe_img = Image.open(BytesIO(okabe_img))
okabe_img = okabe_img.resize((okabe_img.size[0] * canvas_scale, okabe_img.size[1] * canvas_scale), Image.Resampling.NEAREST)

print('Joining all references')
unmasked_img = Image.new('RGBA', (canvas_width * canvas_scale, canvas_height * canvas_scale))
unmasked_img.paste(nixie_tubes_img, nixie_tubes_pos)
unmasked_img.paste(okabe_img, okabe_pos)

print('Preparing mask')
mask_img = open("mask.png", "rb").read()
mask_i = Image.open(BytesIO(mask_img))
mask = Image.new("1", (canvas_width * canvas_scale, canvas_height * canvas_scale), 0)
mask.paste(mask_i)

print('Applying mask to image')
final_img = Image.new('RGBA', (canvas_width * canvas_scale, canvas_height * canvas_scale))
final_img = Image.composite(final_img, unmasked_img, mask)

# Compress the image by reducing the color palette from 32-bit color to 8-bit
print('Compressing image')
final_img = final_img.quantize()

print('Saving image')
final_img.save("overlay.png", optimize=True)
