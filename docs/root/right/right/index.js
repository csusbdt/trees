import '../../../canvasapp.js';
import '../../../state.js';

const path = "root/right/right";

const up    = g_frame(i_up);
const go_up = g_touch(i_up).starts(g_go_up);

const reset_2_off   = g_frame(i_reset_2_off );
const reset_2_on    = g_frame(i_reset_2_on  );
const reset_closing = g_once(g_frames([i_reset_1, i_reset_0, i_blank]));
const reset_opening = g_once(g_frames([i_reset_0, i_reset_1])    );
const t_reset       = g_touch(i_reset_2_on  );

let s = [2, 2, 2, 0, 1, 1, 1];

const left_arrows = [  // 1 in s
	g_frame(i_left_arrow_0),	
	g_frame(i_left_arrow_1),
	g_frame(i_left_arrow_2),
	g_frame(i_left_arrow_3),
	g_frame(i_left_arrow_4),
	g_frame(i_left_arrow_5),
	g_frame(i_left_arrow_6)
];

const right_arrows = [  // 2 in s
	g_frame(i_right_arrow_0),	
	g_frame(i_right_arrow_1),
	g_frame(i_right_arrow_2),
	g_frame(i_right_arrow_3),
	g_frame(i_right_arrow_4),
	g_frame(i_right_arrow_5),
	g_frame(i_right_arrow_6)
];

const stop_arrows = _ => {
	left_arrows.forEach(a => a.stop());
	right_arrows.forEach(a => a.stop());
};

const start_arrows = _ => {
	s.forEach((a, i) => {
		if (a === 1) left_arrows[i].start();		
		else if (a === 2) right_arrows[i].start();
	});
};

const touch_left = i => {
	assert(i > 0);
	if (s[i - 1] === 0) { s[i - 1] = 1;                }
	else                { assert(i > 1); s[i - 2] = 1; }
	s[i] = 0;
	stop_arrows();
	start_arrows();
	start_touchables();
};

const touch_right = i => {
	assert(i < 6);
	if (s[i + 1] === 0) { s[i + 1] = 2;                }
	else                { assert(i < 5); s[i + 2] = 2; }
	s[i] = 0;
	stop_arrows();
	start_arrows();
	start_touchables();
};

const left_touchables = [
    g_touch(i_left_arrow_0).starts(_ => touch_left(0)),
    g_touch(i_left_arrow_1).starts(_ => touch_left(1)),
    g_touch(i_left_arrow_2).starts(_ => touch_left(2)),
    g_touch(i_left_arrow_3).starts(_ => touch_left(3)),
    g_touch(i_left_arrow_4).starts(_ => touch_left(4)),
    g_touch(i_left_arrow_5).starts(_ => touch_left(5)),
    g_touch(i_left_arrow_6).starts(_ => touch_left(6))
];

const right_touchables = [
    g_touch(i_right_arrow_0).starts(_ => touch_right(0)),
    g_touch(i_right_arrow_1).starts(_ => touch_right(1)),
    g_touch(i_right_arrow_2).starts(_ => touch_right(2)),
    g_touch(i_right_arrow_3).starts(_ => touch_right(3)),
    g_touch(i_right_arrow_4).starts(_ => touch_right(4)),
    g_touch(i_right_arrow_5).starts(_ => touch_right(5)),
    g_touch(i_right_arrow_6).starts(_ => touch_right(6))
];

const start_touchables = _ => {
	go_up.start();
	if (s[0] === 2 && s[1] === 2 && s[2] === 2 && s[3] === 0 && s[4] === 1 && s[5] === 1 && s[6] === 1) {
	} else {
		t_reset.start();
		reset_2_off.stop();
		reset_2_on.start();
	}
	const z = s.indexOf(0);
	if (z < 6 && s[z+1] === 1) left_touchables[z+1].start();
	if (z > 0 && s[z-1] === 2) right_touchables[z-1].start();
	if (z < 5 && s[z+2] === 1 && s[z+1] === 2) left_touchables[z+2].start();
	if (z > 1 && s[z-2] === 2 && s[z-1] === 1) right_touchables[z-2].start();
};

const reset = _ => {
	stop_arrows();
	s = [2, 2, 2, 0, 1, 1, 1];
	reset_2_on.stop();
	start_arrows();
    start_touchables();
};

t_reset.stops(reset_2_on).starts(reset_closing);
reset_closing.starts(reset_opening, reset);
reset_opening.starts(reset_2_off);

window.addEventListener('load', () => {
	up.start();
	reset_2_off.start();
	reset();
});
