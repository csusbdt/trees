function c_tone(f, b = 0, v = 1) {
	this.f       = f   ;
	this.b       = b   ;
	this.v       = v   ;
	this.o_left  = null;
	this.o_right = null;
	this.g       = null;
}

c_tone.prototype.start = function(t = 0) {
	if (this.g !== null) return;
	this.g = audio.createGain();
	this.g.connect(gain);
	this.g.gain.value = 1;
	const merger = audio.createChannelMerger();
	merger.connect(this.g);
	this.o_left  = audio.createOscillator();
	this.o_right = audio.createOscillator();
	this.o_left.connect(merger, 0, 0);
	this.o_right.connect(merger, 0, 1);
    if (this.f < this.b) {
    	this.o_left.frequency.value  = this.f; 
    	this.o_right.frequency.value = this.f;
    } else {
    	this.o_left.frequency.value  = this.f - this.b; 
    	this.o_right.frequency.value = this.f + this.b;
    }
	this.o_left.start();
	this.o_right.start();
	this.g.gain.setTargetAtTime(this.v, audio.currentTime + t, .05);
	return this;
};

c_tone.prototype.stop = function(t = 0) {
	if (this.g === null) return;
	this.g.gain.setTargetAtTime(0, audio.currentTime + t, .05);
	let g        = this.g;
	this.g       = null;
	this.o_left  = null;
	this.o_right = null;
	setTimeout(_ => g.disconnect(), 1000);
    return this;
};

c_tone.prototype.set_f = function(f, t = 0) {
	if (f === this.f) return this;
	this.f = f;
	if (this.g !== null) {
	    if (this.f < this.b) {
			this.o_left .frequency.setTargetAtTime(this.f, audio.currentTime + t, .05);
			this.o_right.frequency.setTargetAtTime(this.f, audio.currentTime + t, .05);
	    } else {
			this.o_left .frequency.setTargetAtTime(this.f - this.b, audio.currentTime + t, .05);
			this.o_right.frequency.setTargetAtTime(this.f + this.b, audio.currentTime + t, .05);
	    }
	}	
	return this;
};

c_tone.prototype.set_b = function(b, t = 0) {
	if (b === this.b) return this;
	this.b = b;
	if (this.g !== null) {
	    if (this.f < this.b) {
			this.o_right.frequency.setTargetAtTime(this.f, audio.currentTime + t, .05);
		} else {
			this.o_right.frequency.setTargetAtTime(this.f + this.b, audio.currentTime + t, .05);
		}
	}
	return this;
};

c_tone.prototype.set_v = function(v, t = 0) { 
	if (v === this.v) return this;
	this.v = v;
	if (this.g !== null) {
		this.g.gain.setTargetAtTime(v, audio.currentTime + t, .05);
	}
	return this;
};

c_tone.prototype.set_fv = function(f, v, t = 0) {
	this.set_f(f, t);
	this.set_v(v, t);
	return this;
};

export default c_tone;
