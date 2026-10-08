let audio_context = null;

let tick_buffer = null;

const init_audio = _ => {
	if (!audio_context) {
		audio_context = new (window.AudioContext || window.webkitAudioContext)();
	}
	if (audio_context.state === 'suspended') {
		audio_context.resume();
	}
	if (tick_buffer === null) {
		const bufferSize = audio_context.sampleRate * 0.02; // 20ms duration (sharper)
		tick_buffer = audio_context.createBuffer(1, bufferSize, audio_context.sampleRate);
		const data = tick_buffer.getChannelData(0);  
		for (let i = 0; i < bufferSize; i++) {
			// Sharp exponential decay for a crisp mouse-click feel
			data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 6);
		}
	}
};

window.g_play_tick_duration = 20;
window.g_play_tick = _ => {
	init_audio();
	const source = audio_context.createBufferSource();
	source.buffer = tick_buffer;
	source.connect(audio_context.destination);
	source.start();
}

window.g_play_bop_duration = 150;
window.g_play_bop = _ => {
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

window.g_play_thud_duration = 150;
window.g_play_thud = _ => {
	init_audio();	
	const oscillator = audio_context.createOscillator();
	const gainNode   = audio_context.createGain();
	const startTime  = audio_context.currentTime;
	const endTime    = startTime + 0.15;	
	oscillator.type         = 'sine';
	oscillator.frequency.setValueAtTime(130, startTime);
	oscillator.frequency.exponentialRampToValueAtTime(30, endTime);
	gainNode.gain.setValueAtTime(1.0, startTime);
	gainNode.gain.exponentialRampToValueAtTime(0.001, endTime);
	oscillator.connect(gainNode);
	gainNode.connect(audio_context.destination);
	oscillator.start(startTime);
	oscillator.stop(endTime);
}

window.g_play_boin_duration = 450;
window.g_play_boin = _ => {
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

window.g_play_dit_duration = 80;
window.g_play_dit = _ => {
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

window.g_play_tink_duration = 400;
window.g_play_tink = _ => {
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

