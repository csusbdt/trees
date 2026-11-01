import '../../../../canvasapp.js';

const base      = g_frame(i_base   ).start();
const green     = g_frame(i_green  ).start();
const blue      = g_frame(i_blue   ).start();
const red       = g_frame(i_red    ).start();
const red_t     = g_frame(i_red_t  );

const go_up     = g_touch(i_green  ).starts (g_go_up    ).start();
const go_left   = g_touch(i_blue   ).starts (g_go_left  ).start();
const go_right  = g_touch(i_red_t  ).starts (g_go_right ).start();

get_state(document.title);
