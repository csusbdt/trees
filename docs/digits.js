
const digit_images = [];
const plus_image   = new Image();

for (let i = 0; i < 6; ++i) {
	const digit_image = new Image();
	digit_image.src = url('images/hud/' + i + '.png');
	digit_images.push(digit_image);
}
plus_image.src = url('images/hud/plus.png');

