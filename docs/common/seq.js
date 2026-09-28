import c_tone from "./tone.js";

function c_seq(dur, fs, b = 0, v = 1) {
	this.dur  = dur;
	this.fs   = fs;
    this.b    = b;
    this.v    = v;
	this.i    = null;
	this.id   = null;
	this.tone = new c_tone(0, b, v);
}

c_seq.prototype.set_b = function(b) {
    this.b = b;
    this.tone.set_b(b);
};

c_seq.prototype.next = function() {
	const current_f = this.fs[this.i];	
	if (++this.i === this.fs.length) this.i = 0;
	if (current_f === 0) {
		if (this.fs[this.i] !== 0) {
			this.tone.set_fv(this.fs[this.i], this.v);
		}
	} else {
		if (this.fs[this.i] === 0) {
			this.tone.set_v(0);
		} else {
			this.tone.set_f(this.fs[this.i]);
		}
	}
	this.id = setTimeout(c_seq.prototype.next.bind(this), this.dur);
};

c_seq.prototype.start = function() {
	if (window.stop_audio !== null) {
	    this.i = 0;
		this.tone.set_f(this.fs[this.i]);
	    this.tone.start();
		this.id = setTimeout(c_seq.prototype.next.bind(this), this.dur);
	}
};

c_seq.prototype.stop = function() {
	if (this.id !== null) {
		clearTimeout(this.id);
		this.id = null;
		this.tone.stop();
	}
};

export default c_seq;
