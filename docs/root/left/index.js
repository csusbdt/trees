import "../../common/main.js" ;
import "../../common/state.js" ;
import "../../common/sfx.js";

const click_page = p => {
	if (click_test(i_up, p)) {
		on_click = null;
		play_bop();
		set_timeout(go_up, 90);
	} else if (click_test(i_left_0, p)) {
		on_click = null;
		play_bop();
		if (!get_state("root/left", "left")) {
			set_state("root/left", "left", "true");
			draw_page();
		}
		set_timeout(go_left, 90);
	} else if (click_test(i_right_0, p)) {
		on_click = null;
		play_bop();
		if (!get_state("root/left", "right")) {
			set_state("root/left", "right", "true");
			draw_page();
		}
		set_timeout(go_right, 90);
	}
};

const draw_page = _ => {
	clear_canvas();
	draw(i_up);
	if (get_state("root/left", "left")) {
		draw(i_left_1);
	} else {
		draw(i_left_0);
	}
	if (get_state("root/left", "right")) {
		draw(i_right_1);
	} else {
		draw(i_right_0);
	}
	draw(i_left);
	draw(i_right);
};

window.addEventListener('load', e => {
	draw_page();
	on_click = click_page;
});
