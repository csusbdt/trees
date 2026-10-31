import '../../../canvasapp.js';
import '../../../state.js';

const base          = g_frame(i_base    ).start();
const up            = g_frame(i_up      ).start();
const left          = g_frame(i_left    );
const right         = g_frame(i_right   );
const reset         = g_frame(i_reset_2 );

const reset_closing = g_once(g_frames([ i_reset_1, i_reset_0, i_blank ]));

const t_up          = g_touch(i_up      ).starts(g_go_up    );
const t_left        = g_touch(i_left    );
const t_right       = g_touch(i_right   );
const t_reset       = g_touch(i_reset_2 );

t_left .starts(g_go_left , _ => set_state(document.title, "left"  ));
t_right.starts(g_go_right, _ => set_state(document.title, "right" ));

let s = [2, 2, 2, 0, 1, 1, 1];

const blues = [  // 1 in s
	g_frame(i_blue_0),	
	g_frame(i_blue_1),
	g_frame(i_blue_2),
	g_frame(i_blue_3),
	g_frame(i_blue_4),
	g_frame(i_blue_5),
	g_frame(i_blue_6)
];

const reds = [  // 2 in s
	g_frame(i_red_0),	
	g_frame(i_red_1),
	g_frame(i_red_2),
	g_frame(i_red_3),
	g_frame(i_red_4),
	g_frame(i_red_5),
	g_frame(i_red_6)
];

const update = _ => {
	blues.forEach(a => a.stop());
	reds.forEach(a => a.stop());
	s.forEach((a, i) => {
		if (a === 1) blues[i].start();		
		else if (a === 2) reds[i].start();
	});
};

const touch_blue = i => {
	reset.start();
	assert(i > 0);
	if (s[i - 1] === 0) { s[i - 1] = 1;                }
	else                { assert(i > 1); s[i - 2] = 1; }
	s[i] = 0;
	if (s[0] === 1 && s[1] === 1 && s[2] === 1 && s[3] === 0 && s[4] === 2 && s[5] === 2 && s[6] === 2) {
		left.start();
	}
	update();
	start_touchables();
};

const touch_red = i => {
	reset.start();
	assert(i < 6);
	if (s[i + 1] === 0) { s[i + 1] = 2;                }
	else                { assert(i < 5); s[i + 2] = 2; }
	s[i] = 0;
	if (s[0] === 1 && s[1] === 1 && s[2] === 1 && s[3] === 0 && s[4] === 2 && s[5] === 2 && s[6] === 2) {
		right.start();
	}
	update();
	start_touchables();
};

const blue_touchables = [
    g_touch(i_blue_0).starts(_ => touch_blue(0)),
    g_touch(i_blue_1).starts(_ => touch_blue(1)),
    g_touch(i_blue_2).starts(_ => touch_blue(2)),
    g_touch(i_blue_3).starts(_ => touch_blue(3)),
    g_touch(i_blue_4).starts(_ => touch_blue(4)),
    g_touch(i_blue_5).starts(_ => touch_blue(5)),
    g_touch(i_blue_6).starts(_ => touch_blue(6))
];

const red_touchables = [
    g_touch(i_red_0).starts(_ => touch_red(0)),
    g_touch(i_red_1).starts(_ => touch_red(1)),
    g_touch(i_red_2).starts(_ => touch_red(2)),
    g_touch(i_red_3).starts(_ => touch_red(3)),
    g_touch(i_red_4).starts(_ => touch_red(4)),
    g_touch(i_red_5).starts(_ => touch_red(5)),
    g_touch(i_red_6).starts(_ => touch_red(6))
];

const start_touchables = _ => {
	t_up.start();
	if (s[0] === 2 && s[1] === 2 && s[2] === 2 && s[3] === 0 && s[4] === 1 && s[5] === 1 && s[6] === 1) {
	} else {
		t_reset.start();
	}
	const z = s.indexOf(0);
	if (z < 6 && s[z+1] === 1) blue_touchables[z+1].start();
	if (z > 0 && s[z-1] === 2) red_touchables [z-1].start();
	if (z < 5 && s[z+2] === 1 && s[z+1] === 2) blue_touchables[z+2].start();
	if (z > 1 && s[z-2] === 2 && s[z-1] === 1) red_touchables [z-2].start();
	if (left  .started()) t_left  .start();
	if (right .started()) t_right .start();
};

t_reset.stops(reset).starts(reset_closing);
reset_closing.starts(_ => {
	s = [2, 2, 2, 0, 1, 1, 1];
	update();
    start_touchables();
});

if (get_state(document.title, "left" )) left .start();
if (get_state(document.title, "right")) right.start();
update();
start_touchables();
