import '../../../../canvasapp.js';

const red   = g_frame(i_red   ).start();
const green = g_frame(i_green ).start();
const blue  = g_frame(i_blue  ).start();
const R_G_B = g_frame(i_R_G_B );
const R_G   = g_frame(i_R_G   );
const R_B   = g_frame(i_R_B   );
const G_B   = g_frame(i_G_B   );
const R     = g_frame(i_R     );
const G     = g_frame(i_G     );
const B     = g_frame(i_B     );

const base        = g_frame(i_base    );
const on_on       = g_frame(i_on_on   );
const on_off      = g_frame(i_on_off  );
const off_on      = g_frame(i_off_on  );
const off_off     = g_frame(i_off_off );

const twirl       = g_loop(g_frames([i_twirl_0, i_twirl_1, i_twirl_2, i_twirl_3, i_twirl_4, i_twirl_3, i_twirl_2, i_twirl_1 ]));

const red_dying           = g_once(g_frames([ i_blank ], 1.7));
const red_dying_chained   = g_once(g_frames([ i_blank ], 1.7));
const red_merging         = g_once(g_frames([ i_blank ], 1.7));
const green_dying         = g_once(g_frames([ i_blank ], 1.7));
const green_dying_chained = g_once(g_frames([ i_blank ], 1.7));
const green_merging       = g_once(g_frames([ i_blank ], 1.7));
const blue_dying          = g_once(g_frames([ i_blank ], 1.7));
const blue_dying_chained  = g_once(g_frames([ i_blank ], 1.7));
const blue_merging        = g_once(g_frames([ i_blank ], 1.7));

const t_on          = g_touch(i_on_on   );
const t_off         = g_touch(i_off_on  );

const t_red_die     = g_touch(i_red   );
const t_red_merge   = g_touch(i_red   );
const t_green_die   = g_touch(i_green );
const t_green_merge = g_touch(i_green );
const t_blue_die    = g_touch(i_blue  );
const t_blue_merge  = g_touch(i_blue  );
const t_M           = g_touch(i_R     );

const start_touches = _ => {
    if (on_on.started()) {
        t_off.start();
        if (red   .started()) t_red_die     .start();
        if (green .started()) t_green_die   .start();
        if (blue  .started()) t_blue_die    .start();
    } else {
        t_on.start();
        if (red   .started()) t_red_merge   .start();
        if (green .started()) t_green_merge .start();
        if (blue  .started()) t_blue_merge  .start();
    }
    t_M.start();
};

t_on.stops(on_off, off_on, start_touches).starts(on_on, off_off, twirl, start_touches);
t_off.stops(on_on, off_off, twirl, start_touches).starts(on_off, off_on, start_touches);
t_red_die.stops(red).starts(red_dying);
t_green_die.stops(green).starts(green_dying);
t_blue_die.stops(blue).starts(blue_dying);
t_red_merge.stops(red).starts(red_merging);
t_green_merge.stops(green).starts(green_merging);
t_blue_merge.stops(blue).starts(blue_merging);

t_M.starts(_ => {
    if (on_on.started()) {
        if      (red   .started()) { red.stop(); red_dying_chained.start(); }
        else if (green .started()) { green.stop(); green_dying_chained.start(); }
        else if (blue  .started()) { blue.stop(); blue_dying_chained.start(); }
        else if (R     .started()) g_go_right();
        else if (G     .started()) g_go_up   ();
        else if (B     .started()) g_go_left ();
        else if (R_G   .started()) g_reload  ();
        else if (R_B   .started()) g_reload  ();
        else if (G_B   .started()) g_reload  ();
        else if (R_G_B .started()) g_reload  ();      
        else g_reload();
    } else {
        if      (red   .started()) { red.stop(); red_merging.start(); }
        else if (green .started()) { green.stop(); green_merging.start(); }
        else if (blue  .started()) { blue.stop(); blue_merging.start(); }
        else if (R     .started()) g_go_right();
        else if (G     .started()) g_go_up   ();
        else if (B     .started()) g_go_left ();
        else if (R_G   .started()) g_reload  ();
        else if (R_B   .started()) g_reload  ();
        else if (G_B   .started()) g_reload  ();
        else if (R_G_B .started()) g_reload  ();      
        else g_reload();
    }
});

red_dying_chained.starts(_ => {
    if (green.started()) {
        green.stop();
        green_dying_chained.start();
    }
    else if (blue.started()) {
        blue.stop();
        blue_dying_chained.start();
    }
    start_touches();
});

green_dying_chained.starts(_ => {
    if (red.started()) {
        red.stop();
        red_dying_chained.start();
    }
    else if (blue.started()) {
        blue.stop();
        blue_dying_chained.start();
    }
    start_touches();
});

blue_dying_chained.starts(_ => {
    if (red.started()) {
        red.stop();
        red_dying_chained.start();
    }
    else if (green.started()) {
        green.stop();
        green_dying_chained.start();
    }
    start_touches();
});

red_dying.starts(_ => {
    start_touches();
});

green_dying.starts(_ => {
    start_touches();
});

blue_dying.starts(_ => {
    start_touches();
});

red_merging.starts(_ => {
    if      (G   .started()) { G   .stop(); R_G   .start(); }
    else if (B   .started()) { B   .stop(); R_B   .start(); }
    else if (G_B .started()) { G_B .stop(); R_G_B .start(); }
    else                     {              R     .start(); }
    start_touches();
});


green_merging.starts(_ => {
    if      (R.started   ()) { R   .stop(); R_G   .start(); }
    else if (B.started   ()) { B   .stop(); G_B   .start(); }
    else if (R_B.started ()) { R_B .stop(); R_G_B .start(); }
    else                     {              G     .start(); }
    start_touches();
});

blue_merging.starts(_ => {
    if      (R.started   ()) { R   .stop(); R_B   .start(); }
    else if (G.started   ()) { G   .stop(); G_B   .start(); }
    else if (R_G.started ()) { R_G .stop(); R_G_B .start(); }
    else                     {              B     .start(); }
    start_touches();
});

base.start();
if (get_state(document.title, "beam") === null) {
    set_state(document.title, "beam", "on");
}
if (get_state(document.title, "beam") === "on") {
    on_on.start();
    off_off.start();
    twirl.start();
} else {
    on_off.start();
    off_on.start();
}
start_touches();
