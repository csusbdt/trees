import "../common/main.js" ;
import "../common/state.js" ;
import "../common/sfx.js";

const speed  = 90;

const thud = sfx("../sfx/thud_0.966.mp3", .7);
const blop = sfx("../sfx/blop_0.264.mp3", .4);

let reset_page = i_reset_page_0;
let reset_all  = i_reset_all_0;

const open_reset_page = _ => {
	if (reset_page == i_reset_page_0) {
		blop.start();
		on_click = null;
		reset_page = i_reset_page_1;
		set_timeout(open_reset_page, speed);
	} else if (reset_page == i_reset_page_1) {
		reset_page = i_reset_page_2;
		on_click = click_page;
	} else assert(false);
	draw_page();
};

const close_reset_page = _ => {
	if (reset_page == i_reset_page_2) {
		thud.start();
		reset_page = i_reset_page_1;
		set_timeout(close_reset_page, speed);
	} else if (reset_page == i_reset_page_1) {
		reset_page = i_reset_page_0;
		on_click = click_page;
	} else assert(false);
	draw_page();
};
	
const open_reset_all = _ => {
	if (reset_all == i_reset_all_0) {
		on_click = null;
		reset_all = i_reset_all_1;
		set_timeout(open_reset_all, speed);
	} else if (reset_all == i_reset_all_1) {
		reset_all = i_reset_all_2;
		on_click = click_page;
	} else assert(false);
	draw_page();
};

const close_reset_all = _ => {
	if (reset_all == i_reset_all_2) {
		reset_all = i_reset_all_1;
		set_timeout(close_reset_all, speed);
	} else if (reset_all == i_reset_all_1) {
		reset_all = i_reset_all_0;
		on_click = click_page;
	} else assert(false);
	draw_page();
};

const click_page = p => {
	init_audio();
	if (reset_page == i_reset_page_2) {
		if (click_test(i_ok_reset_page, p)) {
			set_state("root", "left" , null);
			set_state("root", "right", null);
    		on_click = null;
			close_reset_page();
		} else if (click_test(i_cancel_reset_page, p)) {
    		on_click = null;
			close_reset_page();
		}
	} else if (reset_all == i_reset_all_2) {
		if (click_test(i_ok_reset_all, p)) {
			reset_state();
    		on_click = null;
			close_reset_all();
		} else if (click_test(i_cancel_reset_all, p)) {
    		on_click = null;
			close_reset_all();
		}
	} else if (click_test(i_reset_page_0, p)) {
		open_reset_page();
	} else if (click_test(i_reset_all_0, p)) {
		open_reset_all();
	} else if (click_test(i_left, p)) {
		set_state("root", "left", true);
		draw_page();
		go_left();
	} else if (click_test(i_right, p)) {
		set_state("root", "right", true);
		draw_page();
		go_right();
	}
};

const draw_page = _ => {
	clear_canvas();	
	if (get_state('root', 'left' )) draw(i_left);
	if (get_state('root', 'right')) draw(i_right);
	draw(i_root);
	if (reset_page == i_reset_page_2) {
		draw(i_ok_reset_page);
		draw(i_cancel_reset_page);
	}
	if (reset_all == i_reset_all_2) {
		draw(i_ok_reset_all);
		draw(i_cancel_reset_all);
	}
	draw(reset_page);
	draw(reset_all);
};

window.addEventListener('load', e => {
	draw_page();
	on_click = click_page;
});
