import "../common/main.js";
import "../common/sfx.js" ;

const click_page = p => {
	if (click_test(i_bop , p)) play_bop ();
	if (click_test(i_tick, p)) play_tick();
	if (click_test(i_boin, p)) play_boin();
	if (click_test(i_dit , p)) play_dit ();
	if (click_test(i_tink, p)) play_tink();
};

const draw_page = _ => {
	draw(i_bg  );
	draw(i_bop );
	draw(i_tick);
	draw(i_boin);
	draw(i_dit );
	draw(i_tink);
};

window.addEventListener('load', e => {
	draw_page();
	on_click = click_page;
});
