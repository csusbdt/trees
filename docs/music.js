// note: for safari on iOS, need to call play in a user interaction event

window.g_is_music_playing = false;

function c_music(file, on_end, volume, start_time) {
	this.on_end = on_end;
	this.audio_element = new Audio();
	this.audio_element.volume = volume;
	this.start_time = start_time;
	this.audio_element.currentTime = start_time;
    fetch(file)
        .then(response => response.blob())
        .then(blob => {
            this.audio_element.src = URL.createObjectURL(blob);
         })
         .catch(e => log(e));
	if (this.on_end !== null) {
		this.audio_element.addEventListener('ended', e => {
			g_is_music_playing = false;
			this.on_end; 
		});
	}
	this.audio_element.addEventListener('ended', e => {
		if (this.on_end !== null) {
			g_is_music_playing = false;
			this.audio_element.currentTime = this.start_time;
			this.on_end();
		}
	});
	this.audio_element.addEventListener('error', e => {
		if (this.on_end !== null) {
			g_is_music_playing = false;
			this.on_end();
		}
		g_log('c_music error', file);
	});
}

c_music.prototype.start = function() {
	g_is_music_playing = true;
	this.audio_element.play();
};

c_music.prototype.stop = function() {
	g_is_music_playing = false;
	this.audio_element.pause();
};

c_music.prototype.rewind = function() {
	this.audio_element.pause();
	this.audio_element.currentTime = this.start_time;	
};

window.g_music = function(file, on_end = null, volume = 0.5, start_time = 0) {
	return new c_music(file, on_end, volume, start_time);
};
