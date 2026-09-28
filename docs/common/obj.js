export default function c_obj(images, x = 0, y = 0) {
	if (Array.isArray(images)) {
		this.images = images;
	} else {
		this.images = [ images ];
	}
	this.x = x;
	this.y = y;
}

c_obj.prototype.draw = function(x = 0, y = 0) {
	this.images.forEach(o => o.draw(x + this.x, y + this.y));
};

c_obj.prototype.click = function(x = 0, y = 0) {
	for (let i = 0; i < this.images.length; ++i) {
		if (this.images[i].click(x + this.x, y + this.y)) {
			return true;
		}
	}
	return false;
};
