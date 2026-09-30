import "../../common/main.js" ;
import "../../common/sfx.js";

const blop   = sfx("../../sfx/blop_0.264.mp3", .4);
const speed  = 90;
const stubs  = [ i_stub_3, i_stub_2, i_stub_1, i_stub_0, i_blank ];
let   stub_i = 0;

const update_stub = _ => {
	if (stub_i == stubs.length - 1) return location.replace('../' );
	draw_page();
	++stub_i;
};

const click_page = p => {
	if (click_test(i_stub_3, p)) {
		blop.start();
		on_click = null;
		set_interval(update_stub, speed);
	}
};

const draw_page = _ => {
	clear_canvas();
	draw(stubs[stub_i]);
};

window.addEventListener('load', e => {
	draw_page();
	on_click = click_page;
});
