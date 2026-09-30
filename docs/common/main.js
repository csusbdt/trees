///////////////////////////////////////////////////////////////////////////////
//
// errors
//
///////////////////////////////////////////////////////////////////////////////

window.assert = function(condition, msg) {
	if (!condition) {
		if (msg === undefined) msg = "assertion failed";
		log(msg);
		throw new Error(msg);
	}
};

let error_caught = false;

window.addEventListener("error", e => {
    // report first error only
    if (error_caught) return;
	error_caught = true;
	let i = e.filename.indexOf("//") + 2;
	i += e.filename.substring(i).indexOf("/") + 1;
	const filename = e.filename.substring(i);
    document.body.innerHTML = `<h1>${e.error}<br>${filename}<br>Line ${e.lineno}</h1>`;
	setTimeout(_ => {
		document.body.addEventListener('click', e => {
			set('page', 'home'); 
			location.reload();
		});
	}, 0);
	if (audio !== null) audio.close();
});

window.addEventListener('unhandledrejection', e => {
    if (error_caught) return; 
	error_caught = true;
	if (typeof(e.reason.stack) !== 'undefined') {
	    document.body.innerHTML = `<h1>${e.reason}<br>${e.reason.message}<br>${e.reason.stack}</h1>`;
	} else {
	    document.body.innerHTML = `<h1>${e.reason}<br>${e.reason.message}</h1>`;
	}
	document.body.addEventListener('click', e => {
		set('page', 'home'); 
		location.reload();
	});
});

window.log = m => console.log(m);

/////////////////////////////////////////////////////////////////////////////////////////////////
//
// app_state
//
/////////////////////////////////////////////////////////////////////////////////////////////////

/*
const app_name = "amby2";

let app_state = localStorage.getItem(app_name);
if (app_state === null) app_state = { version: "0", volume: 0.5 };
else app_state = JSON.parse(app_state);

window.set = (key, value) => {
	app_state[key] = value;
	localStorage.setItem(app_name, JSON.stringify(app_state));
};

window.get = (key, _default) => {
	if (app_state[key] === undefined) set(key, _default);
	return app_state[key];
};

window.run_page = page => {
	import(page).then(o => o.run());
};

*/

///////////////////////////////////////////////////////////////////////////////////////////////
//
// audio
//
// This framework calls init_audio with every click on the canvas before all other 
// click handlers.
//
///////////////////////////////////////////////////////////////////////////////////////////////

window.audio       = null;
let main_gain      = null;
window.gain        = null;

window.init_audio = _ => {
	if (audio === null) {
		audio = new (window.AudioContext || window.webkitAudioContext)();
	}
	if (audio.state === "suspended") {
		audio.resume();
	}
	if (main_gain === null) {
		const compressor = audio.createDynamicsCompressor();
		compressor.threshold.setValueAtTime( -50, audio.currentTime);
		compressor.knee     .setValueAtTime(  40, audio.currentTime);
		compressor.ratio    .setValueAtTime(  12, audio.currentTime);
		compressor.attack   .setValueAtTime(   0, audio.currentTime);
		compressor.release  .setValueAtTime(0.25, audio.currentTime);
		compressor.connect(audio.destination);
		main_gain = audio.createGain();
		main_gain.gain.value = 1;
		main_gain.connect(compressor);
		gain = audio.createGain();
		//gain.gain.value = get('volume', Math.pow(2, -5));
		gain.connect(main_gain);
	}
};

///////////////////////////////////////////////////////////////////////////////
//
// canvas
//
///////////////////////////////////////////////////////////////////////////////

window.ctx = canvas.getContext('2d');

const click_test_canvas  = document.createElement('canvas');
click_test_canvas.width  = canvas.width;
click_test_canvas.height = canvas.height;

const click_test_ctx     = click_test_canvas.getContext("2d", { willReadFrequently: true });

// Convert mouse/touch event coords to game world coords.
const canvas_coords = e => {
    const canvas_rect = canvas.getBoundingClientRect();
	const canvas_width_in_screen_pixels  = canvas_rect.width;
	const canvas_height_in_screen_pixels = canvas_rect.height;
	const x_in_screen_pixels = e.offsetX;
	const y_in_screen_pixels = e.offsetY;
	const mouse_x_in_canvas_pixels = x_in_screen_pixels / canvas_width_in_screen_pixels  * canvas.width;
	const mouse_y_in_canvas_pixels = y_in_screen_pixels / canvas_height_in_screen_pixels * canvas.height;
	return {
		x: mouse_x_in_canvas_pixels,
		y: mouse_y_in_canvas_pixels
	};
};

window.clear_canvas = _ => {
	ctx.fillStyle = window.getComputedStyle(document.body).backgroundColor;;	
	ctx.fillRect(0, 0, canvas.width, canvas.height);
};

///////////////////////////////////////////////////////////////////////////////
//
// miscellaneous 
//
///////////////////////////////////////////////////////////////////////////////

const timeout_ids = [];

window.set_timeout = function(f, t) {
	const id = setTimeout(f, t);
	timeout_ids.push(id);
	return id;
}

window.clear_timeout = function(id) {
	const i = timeout_ids.indexOf(id);
	if (i !== -1) {
		clearTimeout(id);
		timeout_ids.splice(i, 1);		
	}
}

const interval_ids = [];

window.set_interval = function(f, t) {
	const id = setInterval(f, t);
	interval_ids.push(id);
	return id;
}

window.clear_interval = function(id) {
	const i = interval_ids.indexOf(id);
	if (i !== -1) {
		clearInterval(id);
		interval_ids.splice(i, 1);		
	}
}

window.draw = (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) => {
	if (sx === undefined) {
		ctx.drawImage(image, 0, 0);
	} else if (sWidth === undefined) {
		ctx.drawImage(image, sx, sy);
	} else if (dx === undefined) {
		ctx.drawImage(image, sx, sy, sWidth, sHeight);
	} else if (dWidth === undefined) {
		ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, sWidth, sHeight);
	} else {
		ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	}
};

window.url = path => {
	if (window.location.pathname.startsWith('/trees')) {
		return "/trees" + path;
	} else {
		return path;
	}
};

window.go_up    = () => { on_click = null; location.replace('../'     ); }
window.go_left  = () => { on_click = null; location.replace('./left/' ); }
window.go_right = () => { on_click = null; location.replace('./right/'); }

///////////////////////////////////////////////////////////////////////////////
//
// click handling 
//
///////////////////////////////////////////////////////////////////////////////

window.on_click  = null;
window.click_x   = null;
window.click_y   = null;

canvas.addEventListener('click', e => {
    init_audio();
    if (on_click !== null) {
		on_click(canvas_coords(e));
	}
});

// pixel-based click detection
window.click_test = (images, p) => {
	if (!Array.isArray(images)) images = [images];
    click_test_ctx.clearRect(0, 0, click_test_canvas.width, click_test_canvas.height);
	for (let i = 0; i < images.length; ++i) {
		click_test_ctx.drawImage(images[i], 0, 0);
	}
	const int_x = Math.floor(p.x);
    const int_y = Math.floor(p.y);
	const pixel = click_test_ctx.getImageData(int_x, int_y, 1, 1).data;
	return (pixel[0] + pixel[1] + pixel[2] != 0);
};
