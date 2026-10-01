window.audio_context = null;

const init_audio = _ => {
	if (!audio_context) {
		audio_context = new (window.AudioContext || window.webkitAudioContext)();
	}
	if (audio_context.state === 'suspended') {
		audio_context.resume();
	}
};

window.play_close = _ => {
	init_audio();
	const oscillator = audio_context.createOscillator();
	const gainNode   = audio_context.createGain();
	oscillator.connect(gainNode);
	gainNode.connect(audio_context.destination);	
	const now        = audio_context.currentTime;
	const duration   = 0.15;	
	oscillator.type  = 'sine'; 
	oscillator.frequency.setValueAtTime(300, now);
	oscillator.frequency.exponentialRampToValueAtTime(900, now + duration);
	gainNode.gain.setValueAtTime(0.4, now);
	gainNode.gain.setValueAtTime(0.4, now + 0.03);
	gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
	oscillator.start(now);
	oscillator.stop(now + duration);
}

window.play_click = _ => {
	init_audio();
	const oscillator = audio_context.createOscillator();
	const gainNode   = audio_context.createGain();
	oscillator.connect(gainNode);
	gainNode.connect(audio_context.destination);	
	const now        = audio_context.currentTime;
	const duration   = 0.08;	
	oscillator.type  = 'triangle'; 
	oscillator.frequency.setValueAtTime(400, now);
	oscillator.frequency.exponentialRampToValueAtTime(250, now + duration);
	gainNode.gain.setValueAtTime(0.3, now);
	gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
	oscillator.start(now);
	oscillator.stop(now + duration);
}

window.play_open = _ => {
	init_audio();
	const osc1  = audio_context.createOscillator();
	const osc2  = audio_context.createOscillator();
	const osc3  = audio_context.createOscillator();
	const gain1 = audio_context.createGain();
	const gain2 = audio_context.createGain();
	const gain3 = audio_context.createGain();
	osc1.connect(gain1);
	osc2.connect(gain2);
	osc3.connect(gain3);
	gain1.connect(audio_context.destination);	
	gain2.connect(audio_context.destination);	
	gain3.connect(audio_context.destination);	
	const now = audio_context.currentTime;
	osc1.type = 'sine';
	osc1.frequency.setValueAtTime(523.25, now); // C5 note
	gain1.gain.setValueAtTime(0.2, now);
	gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
	osc1.start(now);
	osc1.stop(now + 0.05);
	const time2 = now + 0.05;
	osc2.type = 'sine';
	osc2.frequency.setValueAtTime(659.25, time2); // E5 note
	gain2.gain.setValueAtTime(0.2, time2);
	gain2.gain.exponentialRampToValueAtTime(0.0001, time2 + 0.05);
	osc2.start(time2);
	osc2.stop(time2 + 0.05);
	const time3 = now + 0.10;
	const duration3 = 0.35;  
	osc3.type = 'sine';
	osc3.frequency.setValueAtTime(783.99, time3); 
	osc3.frequency.exponentialRampToValueAtTime(1046.50, time3 + 0.10);
	gain3.gain.setValueAtTime(0.3, time3);
	gain3.gain.exponentialRampToValueAtTime(0.0001, time3 + duration3);
	osc3.start(time3);
	osc3.stop(time3 + duration3);
}

window.play_something = _ => {
	init_audio();
	const oscillator = audio_context.createOscillator();
	const gainNode = audio_context.createGain();
	oscillator.connect(gainNode);
	gainNode.connect(audio_context.destination);
	const now = audio_context.currentTime;
	oscillator.type = 'sine'; 
	oscillator.frequency.setValueAtTime(587.33, now); // D5 note
	oscillator.frequency.setValueAtTime(880.00, now + 0.1); // A5 note
	gainNode.gain.setValueAtTime(0.3, now); 
	gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.4); 
	oscillator.start(now);
	oscillator.stop(now + 0.4);
}




// window.load_sfx = async (url) => {
// 	const response    = await fetch(url);
// 	const arrayBuffer = await response.arrayBuffer();
// 	const audioBuffer = await audio_context.decodeAudioData(arrayBuffer);
// 	const source      = audio_context.createBufferSource();
// 	source.buffer     = audioBuffer;
// 	source.connect(audio_context.destination);
// 	return source;
// }

/*
async function loadAndPlayAudio(url) {
//  const context = new (window.AudioContext || window.webkitAudioContext)();
  
  // Fetch the raw binary data (much faster than parsing Base64 text)
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  
  // Decode audio data asynchronously in a background thread
  const audioBuffer = await context.decodeAudioData(arrayBuffer);
  
  // Play the sound instantly
  const source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(context.destination);
  source.start(0);
}
*/

/*
function c_sfx(file, volume) {
	this.file = file;
	if (typeof(volume) === 'undefined') {
		this.volume = 1;
	} else {
		this.volume = volume;
	}
	this.array_buffer = null;  // can only decode once
	this.audio_buffer = null;  // decoded audio data

	this.buffer_source_node = null;  // can only play once
	this.fetching = false;
	this.decoding = false;
	this.fetch();
}

// fetch allowed before user interaction 
// use this function to prefetch audio before user interaction
c_sfx.prototype.fetch = function() {
	if (this.array_buffer !== null) {
		return Promise.resolve(this.array_buffer);
	} else if (this.fetching) {
		return Promise.reject("fetching"); // not sure of this logic
	} else {
		this.fetching = true;
		return fetch(this.file).then(response => {
			if (response.ok) {
				return response.arrayBuffer();
			} else {
				this.fetching = false;
				throw new Error(response.status);
			}
		})
		.then(array_buffer => {
			this.array_buffer = array_buffer;
			this.fetching = false;
			return this.array_buffer;
		});
	}
};

// decode (decompressing) requires an AudioContext, which requires user interaction.
// Can only decode array_buffer once!
c_sfx.prototype.decode = function() {
	if (this.audio_buffer !== null) {
		return Promise.resolve(this.audio_buffer);
	} else if (this.decoding) {
		return Promise.reject("decoding");
	} else {
		this.decoding = true;
		return this.fetch()
		.then(array_buffer => {
			return new Promise((resolve, reject) => {
				if (audio_context === null) {
					this.decoding = false;
					return reject("no audio context");
				}
				audio_context.decodeAudioData(
					array_buffer,
					audio_buffer => {
						this.audio_buffer = audio_buffer;
						this.decoding = false;
						resolve(audio_buffer);
					},
					e => {
						this.decoding = false;
						reject(e);
					}
				);
			});
		});
	}
};

c_sfx.prototype.start = function() {
//	if (this.decoding) return;
	this.decode()
	.then(audio_buffer => {
		if (audio_context === null) {
			return;
		}
		const buffer_source_node = audio_context.createBufferSource();
		buffer_source_node.buffer = audio_buffer;
		const gain_node = audio_context.createGain();
		buffer_source_node.connect(gain_node);
		gain_node.connect(audio_context.destination);
		gain_node.gain.setValueAtTime(this.volume, audio_context.currentTime);	
		buffer_source_node.start();
	})
	.catch(e => log(e)); // does this happen when still decoding?
};

window.sfx = function(file, volume) {
	return new c_sfx(file, volume);
};
*/
