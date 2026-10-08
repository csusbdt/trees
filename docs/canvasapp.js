import './state.js';
import './sfx.js';

// Ctrl + Alt + [

///////////////////////////////////////////////////////////////////////////////
//
// vars
//
///////////////////////////////////////////////////////////////////////////////

let touchables       = [];
let dirty            = true;
let previous_time    = new Date().getTime() / 1000;

const drawables      = [];
const updatables     = [];
const ctx            = g_canvas.getContext('2d', { alpha: false });

window.g_play_success = g_play_bop;
window.g_play_fail    = g_play_thud;

///////////////////////////////////////////////////////////////////////////////
//
// helpers
//
///////////////////////////////////////////////////////////////////////////////

window.assert = (condition, message) => {
	if (!condition) {
		throw new Error(message || "Assertion failed");
	}
};

window.g_log = function(...args) {
	args.forEach(arg => console.log(arg));
};

window.g_url = path => {
	if (window.location.pathname.startsWith('/trees')) {
		return "/trees" + path;
	} else {
		return path;
	}
};

window.g_go_up = _ => {
	g_delay(.01).starts(() => location.replace('../'     )).start();
};

window.g_go_left = _ => {
	g_delay(.01).starts(() => location.replace('./left/' )).start();
};

window.g_go_right = _ => {
	g_delay(.01).starts(() => location.replace('./right/')).start();
};

function stop_stop_sets(...stop_sets) {
	stop_sets.forEach(stop_set => {
		stop_set.forEach(o => {
			if (typeof(o) !== 'function') o.stop();
		});
	});
}

function start_start_sets(...start_sets) {
	start_sets.forEach(start_set => {
		start_set.forEach(o => {
			if (typeof(o) === 'function') {
				o();
			} else if ('play' in o) {
				o.play();
			} else {
				o.start();
			}
		});
	});
}

// window.clear_canvas = _ => {
// 	ctx.fillStyle = window.getComputedStyle(document.body).backgroundColor;;	
// 	ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);
// };

///////////////////////////////////////////////////////////////////////////////
//
// animation_loop
//
///////////////////////////////////////////////////////////////////////////////

function animation_loop() {
	const current_time = new Date().getTime() / 1000;
	if (dirty) {
		if (typeof(g_bg) === 'undefined') {
			ctx.fillStyle = 'rgba(250, 249, 246)';
			ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);
		} else {
			ctx.drawImage(g_bg, 0, 0);
		}
		drawables.forEach(o => o.draw(ctx));
		dirty = false;	
	}
	let dt = current_time - previous_time;
	updatables.slice().forEach(o => o.update(dt));
	previous_time = current_time;
	requestAnimationFrame(animation_loop);
}

addEventListener('load', () => {
	requestAnimationFrame(animation_loop);
});

///////////////////////////////////////////////////////////////////////////////
//
// pixel-based click detection
//
///////////////////////////////////////////////////////////////////////////////

const click_test_canvas  = document.createElement('canvas');
click_test_canvas.width  = g_canvas.width  / 4;
click_test_canvas.height = g_canvas.height / 4;
const click_test_ctx     = click_test_canvas.getContext("2d", { willReadFrequently: true });

// Convert screen coords to 1920x1020 canvas coords.
const canvas_coords = e => {
    const canvas_rect = g_canvas.getBoundingClientRect();
	const canvas_width_in_screen_pixels  = canvas_rect.width;
	const canvas_height_in_screen_pixels = canvas_rect.height;
	const x_in_screen_pixels = e.offsetX;
	const y_in_screen_pixels = e.offsetY;
	const mouse_x_in_canvas_pixels = x_in_screen_pixels / canvas_width_in_screen_pixels  * g_canvas.width;
	const mouse_y_in_canvas_pixels = y_in_screen_pixels / canvas_height_in_screen_pixels * g_canvas.height;
	return {
		x: mouse_x_in_canvas_pixels,
		y: mouse_y_in_canvas_pixels
	};
};

// pixel-based click detection
window.g_click_test = (images, p) => {
	if (images === null) return false;
	if (!Array.isArray(images)) images = [images];
	const w = click_test_canvas.width;
	const h = click_test_canvas.height;
    click_test_ctx.clearRect(0, 0, w, h);
	for (let i = 0; i < images.length; ++i) {
		click_test_ctx.drawImage(images[i], 0, 0, w, h);
	}
	const int_x = Math.floor(p.x / 4);
    const int_y = Math.floor(p.y / 4);
	const pixel = click_test_ctx.getImageData(int_x, int_y, 1, 1).data;
	return (pixel[0] + pixel[1] + pixel[2] != 0);
};

///////////////////////////////////////////////////////////////////////////////
//
// circle
//
///////////////////////////////////////////////////////////////////////////////

function c_circle(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
}

c_circle.prototype.inside = function(x, y) {
	return (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y) < this.r * this.r;
};

window.g_circle = function(x, y, r) {
	return new c_circle(x, y, r);
};

///////////////////////////////////////////////////////////////////////////////
//
// rect
//
///////////////////////////////////////////////////////////////////////////////

function c_rect(left, top, right, bottom) {
	this.left = left;
	this.top = top;
	this.right = right;
	this.bottom = bottom;
}

c_rect.prototype.inside = function(x, y) {
	return x >= this.left && x < this.right && y >= this.top && y < this.bottom;
};

c_rect.prototype.center = function() {
	return { 
		x: (this.left + this.right) / 2, 
		y: (this.top + this.bottom) / 2 
	};
};

window.g_rect = function(left, top, right, bottom) {
	return new c_rect(left, top, right, bottom);
};

///////////////////////////////////////////////////////////////////////////////
//
// frame
//
///////////////////////////////////////////////////////////////////////////////

function c_frame(image, duration = 1/8, x = 0, y = 0) {
	this.image = image;
	this.duration = duration;
	this.x = x;
	this.y = y;
	this.z_index = 100;
}

c_frame.prototype.draw = function(ctx, dx = 0, dy = 0) {
	ctx.drawImage(
		this.image, 
		0, 
		0, 
		this.image.width, 
		this.image.height, 
		this.x + dx, 
		this.y + dy, 
		this.image.width, 
		this.image.height);
};

c_frame.prototype.start = function() {
	add_drawable(this);
	dirty = true;
	return this;
};

c_frame.prototype.stop = function() {
	remove_drawable(this);
	return this;
};

window.g_frame = function(image, duration = 1/8, x = 0, y = 0) {
	return new c_frame(image, duration, x, y);
};

window.g_frames = function(images, duration = 1/8, x = 0, y = 0) {
	if (!Array.isArray(images)) {
		return [new c_frame(images, duration, x, y)];
	} else {
		return images.map(image => new c_frame(image, duration, x, y));
	}
};

///////////////////////////////////////////////////////////////////////////////
//
// delay
//
///////////////////////////////////////////////////////////////////////////////

function c_delay(t) {
	this.t = t;
	this.start_set = [];
	this.stop_set  = [];
	this.elapsed_time = 0;
}

c_delay.prototype.starts = function(...os) {
	os.forEach(o => this.start_set.push(o));
	return this;
};

c_delay.prototype.stops = function(...os) {
	os.forEach(o => this.stop_set.push(o));
	return this;
};

c_delay.prototype.start = function() {
	this.elapsed_time = 0;
	add_updatable(this);
	return this;
};

c_delay.prototype.update = function(dt) {
	this.elapsed_time += dt;
	if (this.elapsed_time > this.t) {
		remove_updatable(this);
		stop_stop_sets(this.stop_set);
		start_start_sets(this.start_set);
	}
};

window.g_delay = function(t) {
	return new c_delay(t);
};

///////////////////////////////////////////////////////////////////////////////
//
// once
//
///////////////////////////////////////////////////////////////////////////////

function c_once(frames, z_index = 100, dx = 0, dy = 0) {
	this.frames = frames;
	this.z_index = z_index;
	this.dx = dx;
	this.dy = dy;
	this.start_set = [];
	this.stop_set  = [];
	this.elapsed_time = 0;
}

c_once.prototype.set_dx = function(dx) {
	this.dx = dx;
	dirty = true;
	return this;
}

c_once.prototype.set_dy = function(dy) {
	this.dy = dy;
	dirty = true;
	return this;
}

c_once.prototype.starts = function(...os) {
	os.forEach(o => {
		if (!this.start_set.includes(o)) this.start_set.push(o);
	});
	return this;
};

c_once.prototype.stops = function(...os) {
	os.forEach(o => {
		if (!this.stop_set.includes(o)) this.stop_set.push(o)
	});
	return this;
};

c_once.prototype.started = function() {
	return drawables.includes(this);
};

c_once.prototype.start = function() {
	this.frame_index = 0;
	this.elapsed_time = 0;
	add_drawable(this);
	add_updatable(this);
	dirty = true;
	return this;
};

c_once.prototype.draw = function(ctx) {
	this.frames[this.frame_index].draw(ctx, this.dx, this.dy);
};

c_once.prototype.update = function(dt) {
	this.elapsed_time += dt;
	if (this.elapsed_time > this.frames[this.frame_index].duration) {
		this.elapsed_time = 0;
		++this.frame_index;
		dirty = true;
		if (this.frame_index === this.frames.length) {
			this.frame_index = 0;
			remove_drawable(this);
			remove_updatable(this);
			stop_stop_sets(this.stop_set);
			start_start_sets(this.start_set);
		}
	}
};

window.g_once = function(frames, z_index = 10, dx = 0, dy = 0) {
	if (Array.isArray(frames)) {
		return new c_once(frames, z_index, dx, dy);
	} else {
		return new c_once([frames], z_index, dx, dy);
	}
};

///////////////////////////////////////////////////////////////////////////////
//
// loop
//
///////////////////////////////////////////////////////////////////////////////

function c_loop(frames, z_index = 10, dx = 0, dy = 0) {
	this.frames = frames;
	this.z_index = z_index;
	this.dx = dx;
	this.dy = dy;
	this.frame_index  = 0;
	this.elapsed_time = 0;
}

c_loop.prototype.set_dx = function(dx) {
	this.dx = dx;
	dirty = true;
	return this;
}

c_loop.prototype.set_dy = function(dy) {
	this.dy = dy;
	dirty = true;
	return this;
}

c_loop.prototype.start = function() {
	this.elapsed_time = 0;
	add_drawable(this);
	add_updatable(this);
	return this;
};

c_loop.prototype.stop = function() {
	remove_drawable(this);
	remove_updatable(this);
	return this;
};

c_loop.prototype.started = function() {
	return drawables.includes(this);
};

c_loop.prototype.draw = function(ctx) {
	this.frames[this.frame_index].draw(ctx, this.dx, this.dy);
};

c_loop.prototype.update = function(dt) {
	if (this.frames.length === 1) {
		// ensure an initial draw after start
		if (this.elapsed_time === 0) {
			this.elapsed_time = dt;
			dirty = true;
		}
		return;
	}
	this.elapsed_time += dt;
	if (this.elapsed_time > this.frames[this.frame_index].duration) {
		this.elapsed_time = 0;
		++this.frame_index;
		dirty = true;
		if (this.frame_index === this.frames.length) {
			this.frame_index = 0;
		}
	}
};

window.g_loop = function(frames, z_index = 10, dx = 0, dy = 0) {
	if (Array.isArray(frames)) {
		return new c_loop(frames, z_index, dx, dy);
	} else {
		return new c_loop([frames], z_index, dx, dy);
	}
};

///////////////////////////////////////////////////////////////////////////////
//
// touch
//
///////////////////////////////////////////////////////////////////////////////

function c_touch(shapes, dx, dy) {
	this.shapes       = shapes;
	this.dx           = dx;
	this.dy           = dy;
	this.start_set    = [];
	this.stop_set     = [];
	this.sfx          = null;
}

c_touch.prototype.set_sfx = function(sfx) {
	this.sfx = sfx;
	return this;
};

c_touch.prototype.starts = function(...os) {
	os.forEach(o => this.start_set.push(o));
	return this;
};

c_touch.prototype.stops = function(...os) {
	os.forEach(o => this.stop_set.push(o));
	return this;
};

c_touch.prototype.start = function() {
	add_touchable(this);
	return this;
};

c_touch.prototype.stop = function() {
	remove_touchable(this);
	return this;
};

// c_touch.prototype.start_first = function() {
// 	touchables.unshift(this);
// }

c_touch.prototype.touch = function(p) {
	for (let i = 0; i < this.shapes.length; ++i) {
		const shape = this.shapes[i];
		if (shape instanceof HTMLImageElement || shape instanceof c_frame) {
			if (g_click_test(this.shapes[i], p)) {
				clear_touchables();
				stop_stop_sets(this.stop_set);
				start_start_sets(this.start_set);
				return true;
			}
		} else if (shape.inside(p.x - this.dx, p.y - this.dy)) {
			clear_touchables();
			stop_stop_sets(this.stop_set);
			start_start_sets(this.start_set);
			return true;
		}
	}
	return false;
};

window.g_touch = function(shapes, dx = 0, dy = 0) {
	if (Array.isArray(shapes)) {
		return new c_touch(shapes, dx, dy);
	} else {
		return new c_touch([shapes], dx, dy);
	}
};

///////////////////////////////////////////////////////////////////////////////
//
// input
//
///////////////////////////////////////////////////////////////////////////////

const on_touch = p => {
	for (let i = 0; i < touchables.length; ++i) {
		const touchable = touchables[i];
		if (touchable.touch(p)) {
			if (touchable.sfx === null) {
				if (g_play_success) g_play_success();
			} else {
				touchable.sfx();
			}
			return;
		}
	}
	if (g_play_fail) g_play_fail();
};

const mousemove = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	g_canvas.style.cursor = 'default';
};

const mousedown = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	g_canvas.style.cursor = 'default';
	on_touch(canvas_coords(e));
};

// the following touchend and touchmove code needed for fullscreen on chrome
// see: https://stackoverflow.com/questions/42945378/full-screen-event-on-touch-not-working-on-chrome/42948120

const touchend = e => {
	e.preventDefault();
	e.stopImmediatePropagation();
	g_canvas.style.cursor = 'none';
	on_touch(canvas_coords(e.changedTouches[0]));
};

const touchmove = e => {
	e.preventDefault();
}

window.addEventListener('mousemove', mousemove, true);
window.addEventListener('mousedown', mousedown, true); 
window.addEventListener('touchend' , touchend , true); 
window.addEventListener('touchmove', touchmove, { passive: false }); 


///////////////////////////////////////////////////////////////////////////////
//
// touchables
//
///////////////////////////////////////////////////////////////////////////////

const add_touchable = function(o) {
	if (touchables.includes(o)) return;
	touchables.push(o);
};

// const unshift_touchable = function(o) {
// 	touchables.unshift(o);
// };

window.clear_touchables = function() {
	touchables.length = 0;
};

const remove_touchable = function(o) {
	const i = touchables.indexOf(o);
	if (i !== -1) {
		touchables.splice(i, 1);
	}
};

///////////////////////////////////////////////////////////////////////////////
//
// drawables
//
///////////////////////////////////////////////////////////////////////////////

const add_drawable = function(o) {
	if (!('z_index' in o)) throw new Error(o);
	if (drawables.includes(o)) return;
	dirty = true;
	for (let i = drawables.length; i > 0; --i) {
		if (o.z_index >= drawables[i - 1].z_index) {
			drawables.splice(i, 0, o);
			return;
		}
	}
	drawables.unshift(o);
};

// const clear_drawables = function() {
// 	drawables.length = 0;
// 	dirty = true;
// };

const remove_drawable = function(o) {
	const i = drawables.indexOf(o);
	if (i !== -1) {
		drawables.splice(i, 1);
		dirty = true;
	}
};

///////////////////////////////////////////////////////////////////////////////
//
// updatables
//
///////////////////////////////////////////////////////////////////////////////

const add_updatable = function(o) {
	if (updatables.includes(o)) return;
	updatables.push(o);
};

// const clear_updatables = function() {
// 	updatables.length = 0;
// };

const remove_updatable = function(o) {
	const i = updatables.indexOf(o);
	if (i !== -1) {
		updatables.splice(i, 1);
	}
};
