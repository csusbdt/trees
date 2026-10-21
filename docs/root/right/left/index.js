import '../../../canvasapp.js';

const left          = g_frame(i_left   );
const right         = g_frame(i_right  );
const gre           = g_frame(i_gre_0  );
const Gre           = g_frame(i_Gre_0  );
const yel           = g_frame(i_yel_0  );
const Yel           = g_frame(i_Yel_0  );
const cya           = g_frame(i_cya_0  );
const Cya           = g_frame(i_Cya_0  );

const gre_moving    = g_once(g_frames([ i_gre_1, i_gre_2, i_gre_3, i_blank ]));
const yel_moving    = g_once(g_frames([ i_yel_1, i_yel_2,          i_blank ]));
const cya_moving    = g_once(g_frames([ i_cya_1, i_cya_2, i_cya_3, i_blank ]));
const Gre_going     = g_once(g_frames([ i_Gre_1, i_Gre_2,          i_blank ]));
const Yel_going     = g_once(g_frames([ i_Yel_1, i_Yel_2,          i_blank ]));
const Cya_going     = g_once(g_frames([ i_Cya_1, i_Cya_2,          i_blank ]));

const t_left        = g_touch(i_left  );
const t_right       = g_touch(i_right );
const t_gre         = g_touch(i_gre_0 );
const t_Gre         = g_touch(i_Gre_0 );
const t_yel         = g_touch(i_yel_0 );
const t_Yel         = g_touch(i_Yel_0 );
const t_cya         = g_touch(i_cya_0 );
const t_Cya         = g_touch(i_Cya_0 );

let selected = null;

t_gre.starts(_ => {
    selected = gre;
    gre.stop();
    gre_moving.start();
});

t_yel.starts(_ => {
    selected = yel;
    yel.stop();
    yel_moving.start();
});

t_cya.starts(_ => {
    selected = cya;
    cya.stop();
    cya_moving.start();
});

gre_moving.starts(_ => {
    if (yel.started()) t_yel.start();
    if (cya.started()) t_cya.start();
    t_right.start();
});

yel_moving.starts(_ => {
    if (gre.started()) t_gre.start();
    if (cya.started()) t_cya.start();
    t_right.start();
});

cya_moving.starts(_ => {
    if (gre.started()) t_gre.start();
    if (yel.started()) t_yel.start();
    t_right.start();
});

t_right.starts(_ => {
    right.stop();
    left.start();
    t_left.start();
    if (selected === gre) {
        Gre.start();
        t_Gre.start();
    } else if (selected === yel) {
        Yel.start();
        t_Yel.start();
    } else if (selected === cya) {
        Cya.start();
        t_Cya.start();
    }
});

t_left.starts(_ => {
    left.stop();
    Gre.stop();
    Yel.stop();
    Cya.stop();
    right.start();
    gre.start();
    yel.start();
    cya.start();
    t_gre.start();
    t_yel.start();
    t_cya.start();
    t_right.start();
});

t_Gre.stops(Gre).starts(Gre_going);
Gre_going.starts(g_go_up);
t_Yel.stops(Yel).starts(Yel_going);
Yel_going.starts(g_go_right);
t_Cya.stops(Cya).starts(Cya_going);
Cya_going.starts(g_go_left);

window.addEventListener('load', e => {
    get_state(document.title);
    right.start();
    gre.start();
    yel.start();
    cya.start();
    t_right.start();
    t_gre.start();
    t_yel.start();
    t_cya.start();
});
