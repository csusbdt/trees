import '../canvasapp.js';

const image_digits = [ i_0, i_1, i_2, i_3, i_4, i_5, i_6, i_7, i_8, i_9 ];

const ctx = g_canvas.getContext('2d', { alpha: false });

function c_number(num = 0, x = 0, y = 0, duration = null, z_index = null, s = 1) {
    this.digits = [];
    for (let i = 0; i < 10; ++i) {
        this.digits[i] = g_frame(image_digits[i], x, y, duration, z_index, s);
    }
    this.z_index = this.digits[0].z_index;
    this.num = num;
}

c_number.prototype.set = function(num = 0) {
    this.num = num;
};

c_number.prototype.inc = function() {
    ++this.num;
    dirty = true;
};

c_number.prototype.start = function() {
    this.digits[this.num].start();
    add_drawable(this);
	return this;
};

c_number.prototype.stop = function() {
    this.digits[this.num].stop();
    remove_drawable(this);
	return this;
};

c_number.prototype.draw = function(ctx, dx = 0, dy = 0) {
    this.digits[this.num].draw(ctx, dx, dy);
};

window.g_number = function(num = 0, x = 0, y = 0, s = 1) {
    return new c_number(num, x, y, s);
};


const bop      = g_frame(i_bop);
const num      = g_number();

const play_bop = g_touch(i_bop);

const start_touchables = _ => {
    play_bop.start();
};

play_bop.starts(g_play_bop, start_touchables, _ => {
    num.inc();
});

window.addEventListener('load', e => {
    num.start();
    bop.start();
    play_bop.start();
});

