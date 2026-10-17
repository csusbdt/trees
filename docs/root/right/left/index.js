import '../../../canvasapp.js';

const path = 'root/right/left';

const center   = g_frame(i_center  ).start();
const up       = g_frame(i_up      ).start();
const left_0   = g_frame(i_left_0  ).start();
const right_0  = g_frame(i_right_0 ).start();

const go_up    = g_touch(i_up      ).start();
const go_left  = g_touch(i_left_0  ).start();
const go_right = g_touch(i_right_0 ).start();

go_up   .starts(g_go_up   );
go_left .starts(g_go_left );
go_right.starts(g_go_right);

window.addEventListener('load', e => {
    get_state(path);
});
