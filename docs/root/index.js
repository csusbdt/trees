import '../canvasapp.js';

const num_branches         = 14;
const num_visited          = Object.keys(get_state().pages).length - 1;
const num_not_visited      = num_branches - num_visited;

const visited_0            = g_number(num_visited    , 120,  78, 1, 11, 0.2);
const not_visited_0        = g_number(num_not_visited, 118,  99, 1, 11, 0.2);
const visited_2            = g_number(num_visited    , 678, 370, 1, 11, 1.3);
const not_visited_2        = g_number(num_not_visited, 678, 500, 1, 11, 1.3);

const root                 = g_frame(i_root                   );
const left                 = g_frame(i_left                   );
const right                = g_frame(i_right                  );
const complete             = g_frame(i_complete               );
const visited_closed       = g_frame(i_visited_0              );
const visited_opened       = g_frame(i_visited_2              );
const reset_opened         = g_frame(i_reset_2                );
const reset_closed         = g_frame(i_reset_0                );

const visited_opening      = g_once(g_frames(i_visited_1)     );
const visited_closing      = g_once(g_frames(i_visited_1)     );
const reset_opening        = g_once(g_frames(i_reset_1)       );
const ok_reset_closing     = g_once(g_frames(i_reset_1)       );
const cancel_reset_closing = g_once(g_frames(i_reset_1)       );

const t_open_reset         = g_touch(g_circle(1905,  46, 100 ));
const t_ok_reset           = g_touch(g_circle(1405, 308, 194 ));
const t_cancel_reset       = g_touch(g_circle(1505, 756, 151 ));
const t_open_visited       = g_touch(i_visited_0              );
const t_close_visited      = g_touch(i_visited_2              );
const t_left               = g_touch(i_left                   );
const t_right              = g_touch(i_right                  );

const start_touches = _ => {
	if (visited_opened.started()) {
		t_close_visited.start();
	} else if (reset_opened.started()) {
		t_ok_reset.start();
		t_cancel_reset.start();
	} else {
		t_left.start();
		t_right.start();
		t_open_reset.start();
		t_open_visited.start();
	}
};

const f_ok_reset = _ => {
	reset_state();
	window.location.reload(); 
};

visited_closing      .starts(visited_closed, visited_0, not_visited_0, start_touches );
cancel_reset_closing .starts(reset_closed, start_touches                             );
ok_reset_closing     .starts(reset_closed, f_ok_reset                                );

reset_opening   .starts(reset_opened, start_touches                                  );
visited_opening .starts(visited_opened, visited_2, not_visited_2, start_touches      );

t_open_reset    .set_sfx(g_play_boin);
t_cancel_reset  .set_sfx(g_play_dit);

t_open_reset    .stops(reset_closed                                                 );
t_open_visited  .stops(visited_closed, visited_0, not_visited_0                     );
t_ok_reset      .stops(reset_opened                                                 );
t_cancel_reset  .stops(reset_opened                                                 );
t_close_visited .stops(visited_opened, visited_2, not_visited_2                     );

t_open_reset    .starts(reset_opening                                               );
t_ok_reset      .starts(ok_reset_closing                                            );
t_cancel_reset  .starts(cancel_reset_closing                                        );
t_open_visited  .starts(visited_opening                                             );
t_close_visited .starts(visited_closing                                             );

t_left.starts(() => {
	set_state(document.title, 'left', true);
	left.start();
	g_go_left();
});

t_right.starts(() => {
	set_state(document.title, 'right', true);
	right.start();
	g_go_right();
});

window.addEventListener('load', e => {
	reset_closed      .start();
	visited_closed    .start();
	visited_0         .start();
	not_visited_0     .start();
    root              .start();
	if (get_state(document.title, 'left')) {
		left.start();
	} 
	if (get_state(document.title, 'right')) {
		right.start();
	}
	if (num_not_visited === 0) {
		complete.start();
	}	
	start_touches();	
});
