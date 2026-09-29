import                    "../common/main.js" ;
import c_img         from "../common/img.js"  ;
import c_obj         from "../common/obj.js"  ;
import { get_state, set_state, save_state } from '../common/state.js';

const bg_color = window.getComputedStyle(document.body).backgroundColor;

// const obj = (blue, border) => new c_obj([ blue, border ]);
// const img = n => new c_img("./images/" + n + ".png");

// const home        = obj(img("home_b"  ), img("home"  ));
// const volume      = obj(img("volume_b"), img("volume"));
// const button      = img("button"     );
// const button_b    = img("button_b"   );
// const button_0    = img("button_0"   );
// const button_1    = img("button_1"   );
// const button_2    = img("button_2"   );
// const button_g_1  = img("button_g_1" );
// const button_g_2  = img("button_g_2" );

// const couple      = img("couple"     );
// const bathysphere = img("bathysphere");
// const car         = img("car"        );
// const books       = img("books"      );
// const concert     = img("concert"    );
// const synthesizer = img("synthesizer");

// const photos = [ 
// 	bathysphere, 
// 	synthesizer, 
// 	books, 
// 	couple, 
// 	concert
// ];

// const anim = [
// 	[ bg_green, home, volume, button_b, button ],
// 	[ button_0, button, home, volume ],
// 	[ button_g_1, button_1, home, volume ],
// 	[ button_g_2, button_2, home, volume ]
// ];

const speed  = 220;
// let anim_i   = 0;
// let photo_i  = 0;
// let photo_id = null;

const start = _ => {
	// if (on_click !== null) {
	// 	on_click = null;
	// 	photo_i = 0;
	// } else if (++anim_i === anim.length) {
	// 	music();
	// 	loop_photos();
	// 	on_click = click_page;
	// 	return;
	// }
	setTimeout(start, speed);
};

// const loop_photos = _ => {
// 	if (photo_id !== null && ++photo_i === photos.length) {
// 		photo_i = 0;
// 		music();
// 		music();
// 	}
// 	photo_id = setTimeout(loop_photos, 16000);
//     on_resize();
// };

const stop = _ => {
	// if (anim_i === anim.length) {
	// 	on_click = null;
	// 	clearTimeout(photo_id);
	// 	photo_id = null;
	// }	
	// if (--anim_i === 0) {
	// 	music();
	// 	on_click = click_page;
	// } else {
	// 	setTimeout(stop, speed);
	// }
};

const click_page = _ => {
	// if (anim_i === 0) {
	//     if (click(home)) return location = "../"; 
	//     else if (click(volume)) return run_volume();
	//     else if (click(button_b)) {
	// 		start();
	// 	}
	// } else {
	// 	stop();
	// }
};

const draw_page = _ => {
	ctx.fillStyle = bg_color;	
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	if (get_state('root', 'left') && get_state('root', 'right')) {
		draw(i_root_left_right);
	} else if (get_state('root', 'left') && !get_state('root', 'right')) {
		draw(i_root_left_blank);
	} else if (!get_state('root', 'left') && get_state('root', 'right')) {
		draw(i_root_blank_right);
	} else {
		draw(i_root_blank_blank);
	}	
	draw(i_root_blank_blank);
};

on_click  = click_page;

window.addEventListener('load', e => {
	draw_page();
	//start();
});
