import "../common/main.js" ;
import "../common/state.js" ;
import "../common/sfx.js";

const speed = 90;

let reset_app  = i_reset_app_0;

const open_reset_app = _ => {
	if (reset_app == i_reset_app_0) {
		reset_app = i_reset_app_1;
		set_timeout(open_reset_app, speed);
	} else if (reset_app == i_reset_app_1) {
		reset_app = i_reset_app_2;
		on_click = click_page;
	} else assert(false);
	draw_page();
};

const close_reset_app = _ => {
	if (reset_app == i_reset_app_2) {
		reset_app = i_reset_app_1;
		set_timeout(close_reset_app, speed);
	} else if (reset_app == i_reset_app_1) {
		reset_app = i_reset_app_0;
		on_click = click_page;
	} else assert(false);
	draw_page();
};

const click_page = p => {
	if (reset_app == i_reset_app_2) {
		if (click_test(i_ok_reset_app, p)) {
    		on_click = null;
			play_bop();
			reset_state();
			close_reset_app();
		} else if (click_test(i_cancel_reset_app, p)) {
    		on_click = null;
			play_bop();
			close_reset_app();
		}
	} else if (click_test(i_reset_app_0, p)) {
		on_click = null;
		play_boin();
		open_reset_app();
	} else if (click_test(i_left, p)) {
		on_click = null;
		play_bop();
		set_state("root", "left", true);
		draw_page();
		set_timeout(go_left, speed);
	} else if (click_test(i_right, p)) {
		on_click = null;
		play_bop();
		set_state("root", "right", true);
		draw_page();
		set_timeout(go_right, speed);
	}
};

const draw_page = _ => {
	clear_canvas();	
	if (get_state('root', 'left' )) draw(i_left);
	if (get_state('root', 'right')) draw(i_right);
	draw(i_root);
	draw(reset_app);
};

window.addEventListener('load', e => {
	draw_page();
	on_click = click_page;
});
