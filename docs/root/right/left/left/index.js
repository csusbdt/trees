import '../../../../canvasapp.js';

const left          = g_frame(i_left    );
const right         = g_frame(i_right   );
const red           = g_frame(i_red     );
const red_a         = g_frame(i_red_a   );
const red_b         = g_frame(i_red_b   );
const yel           = g_frame(i_yel     );
const yel_a         = g_frame(i_yel_a   );
const yel_b         = g_frame(i_yel_b   );
const gre           = g_frame(i_gre     );
const gre_a         = g_frame(i_gre_a   );
const gre_b         = g_frame(i_gre_b   );
const Red           = g_frame(i_Red     );
const Red_a         = g_frame(i_Red_a   );
const Red_b         = g_frame(i_Red_b   );
const Yel           = g_frame(i_Yel     );
const Yel_a         = g_frame(i_Yel_a   );
const Yel_b         = g_frame(i_Yel_b   );
const Gre           = g_frame(i_Gre     );
const Gre_a         = g_frame(i_Gre_a   );
const Gre_b         = g_frame(i_Gre_b   );

const red_moving    = g_once(g_frames([ i_red_a, i_red_b, i_blank ]));
const Red_moving    = g_once(g_frames([ i_Red_a, i_Red_b, i_blank ]));
const Red_going     = g_once(g_frames([ i_Red_a, i_Red_b, i_blank ]));

const t_red         = g_touch(i_red   );
const t_Red         = g_touch(i_Red   );
const t_left        = g_touch(i_left  );
const t_right       = g_touch(i_right );

t_red.stops(red).starts(red_moving);
t_Red.stops(Red).starts(Red_moving);
t_right.stops(right, red).starts(Red_going);
t_left.stops(left, Red).starts(right, red, t_right, t_red);

red_moving.stops(right).starts(left, Red, t_left, t_Red);
Red_moving.stops(left).starts(right, red, t_right, t_red);
Red_going.starts(g_go_up);

// fill_0_closing.starts(_ => {
//     fill_0.stop();
//     if (up_1.started()) {
//         up_1.stop();
//     }
//     fill_1.start();
//     up_0.start();
//     t_up_0.start(); 
//     t_fill_1.start();
// });

// fill_1_closing.starts(_ => {
//     fill_1.stop();
//     if (!up_0.started()) {
//         up_1.start();
//         t_up_1.start();
//     }
//     fill_0.start();
//     t_fill_0.start();
// });

// up_0_closing.starts(_ => {
//     fill_1.stop();
//     fill_0.start();
//     up_1.start();
//     t_up_1.start(); 
//     t_fill_0.start();
// });

// up_1_closing.starts(_ => {
//     fill_0.stop();
//     fill_1.start();
//     up_0.start();
//     t_up_0.start(); 
//     t_fill_0.start();
// });

// t_fill_0.starts(_ => {
//     assert(fill_0.started);
//     fill_0_closing.start();
// });

// t_fill_1.starts(_ => {
//     assert(fill_1.started);
//     fill_1_closing.start();
// });

// t_up_0.starts(_ => {
//     up_0.stop();
//     up_0_closing.start();
// });

// t_up_1.starts(g_go_up);

window.addEventListener('load', e => {
    get_state(document.title);
    right.start();
    red.start();
    t_right.start();
    t_red.start();
});
