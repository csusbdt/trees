//////////////////////////////////////////////////////////////////////////////////////////
//
// audio
//
///////////////////////////////////////////////////////////////////////////////////////////

window.audio          = null  ;
window.gain           = null  ;
window.captured_notes = []    ;
let app_silent        = false ;
let app_volume        = 1     ;

window.init_audio = _ => {
	// this function must run in click handler to work on apple hardware
	if (audio === null) {
		audio = new (window.AudioContext || window.webkitAudioContext)();
		assert(audio !== null)
	}
	if (audio.state === "suspended") {
		audio.resume();
	}
	if (gain === null) {
		gain = audio.createGain();
		gain.gain.value = app_volume;
		gain.connect(audio.destination);
	}
}

window.silent = b => {
	init_audio();
	if (b === undefined) {
		return app_silent;
	} else if (b) {
		app_silent = true;
		gain.gain.setTargetAtTime(0, audio.currentTime, .01);
	} else {
		app_silent = false;
		gain.gain.setTargetAtTime(app_volume, audio.currentTime, .01);
	}
};

window.volume = v => {
	if (v === undefined) {
		return app_volume;
	}
	init_audio();
	if (v < 0) v = 0;
	if (v > 1) v = 1;
	app_volume = v;
	if (!app_silent) {
		gain.gain.setTargetAtTime(v, audio.currentTime, .01);
	}
};

