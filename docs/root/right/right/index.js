import '../../../canvasapp.js';
import '../../../state.js';

const stub_closing = g_once(g_frames([i_stub_1, i_stub_2, i_stub_3, i_blank]))
                     .starts(g_go_up);
const stub_opened  = g_loop(g_frames(i_stub_0)).start();
const stub_go      = g_touch(g_circle(950, 503, 230)).start()
                     .stops(stub_opened).starts(stub_closing);

window.addEventListener('load', e => {
});
