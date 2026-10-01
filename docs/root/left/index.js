import "../../common/main.js" ;
import "../../common/state.js" ;
import "../../common/sfx.js";

const update_stub = _ => {
	if (stub_i == stubs.length - 1) return location.replace('../' );
	draw_page();
	++stub_i;
};

const click_page = p => {
	if (click_test(i_up, p)) {
		on_click = null;
		play_bop();
		set_timeout(go_up, 90);
	}
};

const draw_page = _ => {
	clear_canvas();
	draw(i_up);
};

window.addEventListener('load', e => {
	draw_page();
	on_click = click_page;
});
