import '../canvasapp.js';

// const digits = [ 
// 	g_frames(i_0), 
// 	g_frames(i_1), 
// 	g_frames(i_2), 
// 	g_frames(i_3), 
// 	g_frames(i_4), 
// 	g_frames(i_5), 
// 	g_frames(i_6), 
// 	g_frames(i_7), 
// 	g_frames(i_8), 
// 	g_frames(i_9) 
// ];

const open_reset_all      = g_touch(g_circle(1905,  46, 100 ));
const ok_reset_all        = g_touch(g_circle(1405, 308, 194 ));
const cancel_reset_all    = g_touch(g_circle(1505, 756, 151 ));
const open_visited        = g_touch(i_visited_0);
const close_visited       = g_touch(i_visited_2);
const left                = g_touch(g_circle( 846, 551,  50 ));
const right               = g_touch(g_circle( 974, 551,  43 ));

const visited_closed      = g_frame(i_visited_0);
const visited_opened      = g_frame(i_visited_2);
const visited_opening     = g_once([g_frame(i_visited_1)]);
const visited_closing     = g_once([g_frame(i_visited_1)]);
open_visited.stops(visited_closed);
open_visited.starts(visited_opening);
close_visited.stops(visited_opened);
close_visited.starts(visited_closing);
visited_opening.starts(visited_opened, close_visited);
visited_closing.starts(visited_closed, open_reset_all, open_visited);

const reset_all_opened    = g_loop(g_frames(i_reset_all_2     ));
const reset_all_closed    = g_loop(g_frames(i_reset_all_0     ));

const root_blank_blank    = g_loop(g_frames(i_root_blank_blank));
const root_blank_right    = g_loop(g_frames(i_root_blank_right));
const root_left_blank     = g_loop(g_frames(i_root_left_blank ));
const root_left_right     = g_loop(g_frames(i_root_left_right ));

const reset_all_opening   = g_once(g_frames(i_reset_all_1 ));
const reset_all_closing   = g_once(g_frames(i_reset_all_1 ));

// const draw_digit = n => {
// 	digits[n].draw();
// }

//const nodes_visited = Object.keys(get_state().pages).length;

const f_ok_reset_all = function() {
	reset_state();
	root_blank_right.stop();
	root_left_blank .stop();
	root_left_right .stop();
	root_blank_blank.start();
};

open_reset_all   .stops(open_reset_all, reset_all_closed, left, right      );
ok_reset_all     .stops(ok_reset_all, cancel_reset_all, reset_all_opened   );
cancel_reset_all .stops(cancel_reset_all, ok_reset_all, reset_all_opened   );

open_reset_all   .starts(reset_all_opening                                 );
ok_reset_all     .starts(reset_all_closing, f_ok_reset_all                 );
cancel_reset_all .starts(reset_all_closing                                 );

open_reset_all.set_sfx(g_play_boin);
cancel_reset_all.set_sfx(g_play_dit);

left.starts(() => {
	set_state('root', 'left', true);
	g_go_left();
});
right.starts(() => {
	set_state('root', 'right', true);
	g_go_right();
});

reset_all_opening.starts(reset_all_opened, ok_reset_all, cancel_reset_all           );
reset_all_closing.starts(reset_all_closed, open_visited, open_reset_all, left, right);

window.addEventListener('load', e => {
	visited_closed.start();
	open_visited.start();
	reset_all_closed  .start();
    open_reset_all    .start();
    left              .start();
    right             .start();
	if (get_state('root', 'left') && get_state('root', 'right')) {
		root_left_right.start();
	} else if (get_state('root', 'left') && !get_state('root', 'right')) {
		root_left_blank.start();
	} else if (!get_state('root', 'left') && get_state('root', 'right')) {
		root_blank_right.start();
	} else {
		root_blank_blank.start();
	}
});
