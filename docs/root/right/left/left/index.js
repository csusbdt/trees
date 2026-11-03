import '../../../../canvasapp.js';

const base     = g_frame(i_base   ).start();
const up       = g_frame(i_up     );
const left     = g_frame(i_left   );
const right    = g_frame(i_right  );
const noop     = g_frame(i_cyan   );
const reset    = g_frame(i_reset  );

const blue     = g_frames([ i_blue_0 , i_blue_1 , i_blue_2 , i_blue_3 , i_blue_4  ]);
const red      = g_frames([ i_red_0  , i_red_1  , i_red_2  , i_red_3  , i_red_4   ]);
const green    = g_frames([ i_green_0, i_green_1, i_green_2, i_green_3, i_green_4 ]);
const cyan     = g_frames([ i_cyan_0 , i_cyan_1 , i_cyan_2 , i_cyan_3 , i_cyan_4  ]);

const go_up    = g_touch(i_up     ).starts (g_go_up    );
const go_left  = g_touch(i_left   ).starts (g_go_left  );
const go_right = g_touch(i_right  ).starts (g_go_right );
const t_noop   = g_touch(i_cyan   ).starts (g_reload   );
const t_reset  = g_touch(i_reset  ).starts (g_reload   );

const t_blue   = g_touches([ i_blue_0 , i_blue_1 , i_blue_2 , i_blue_3 , i_blue_4  ]);
const t_red    = g_touches([ i_red_0  , i_red_1  , i_red_2  , i_red_3  , i_red_4   ]);
const t_green  = g_touches([ i_green_0, i_green_1, i_green_2, i_green_3, i_green_4 ]);
const t_cyan   = g_touches([ i_cyan_0 , i_cyan_1 , i_cyan_2 , i_cyan_3 , i_cyan_4  ]);

const h0  = _ => red[0].stopped() & blue[0].stopped();
const h1  = _ => red[1].stopped() & blue[1].stopped();
const h2  = _ => red[2].stopped() & blue[2].stopped() & green[2].stopped() & cyan[2].stopped();
const h3  = _ => red[3].stopped() & blue[3].stopped();
const h4  = _ => red[4].stopped() & blue[4].stopped();

const v0  = _ => cyan[0].stopped() & green[0].stopped();
const v1  = _ => cyan[1].stopped() & green[1].stopped();
const v2  = h2;
const v3  = _ => cyan[3].stopped() & green[3].stopped();
const v4  = _ => cyan[4].stopped() & green[4].stopped();

const start_touches = _ => {
    let stuck = true;
    if (h0()) {
        if (blue[1].started()) { t_blue[1].start(); stuck = false; }
        if (red[1].started() && blue[2].started()) { t_blue[2].start(); stuck = false; }
    } else if (h1()) {
        if (red[0].started()) { t_red[0].start(); stuck = false; }
        if (blue[2].started()) { t_blue[2].start(); stuck = false; }
        if (red[2].started() && blue[3].started()) { t_blue[3].start(); stuck = false; }
    } else if (h2()) {
        if (red  [1].started()) { t_red  [1].start(); stuck = false; }
        if (blue [3].started()) { t_blue [3].start(); stuck = false; }
        if (red [3].started() && blue[4].started()) { t_blue[4].start(); stuck = false; }
        if (red [0].started() && blue[1].started()) { t_red[0].start(); stuck = false; }
        if (green[3].started()) { t_green[3].start(); stuck = false; }
        if (cyan [1].started()) { t_cyan [1].start(); stuck = false; }
        if (cyan[3].started() && green[4].started()) { t_green[4].start(); stuck = false; }
        if (cyan [0].started() && green[1].started()) { t_cyan[0].start(); stuck = false; }
    } else if (h3()) {
        if (red[2].started()) { t_red[2].start(); stuck = false; } 
        if (blue[4].started()) { t_blue[4].start(); stuck = false; } 
        if (red[1].started() && blue[2].started()) { t_red[1].start(); stuck = false; }
    } else if (h4()) {
        if (red[3].started()) { t_red[3].start(); stuck = false; }
        if (red[2].started() && blue[3].started()) { t_red[2].start(); stuck = false; } 
    } else if (v0()) {
        if (green[1].started()) { t_green[1].start(); stuck = false; }
        if (cyan[1].started() && green[2].started()) { t_green[2].start(); stuck = false; }
    } else if (v1()) {
        if (cyan[0].started()) { t_cyan[0].start(); stuck = false; }
        if (green[2].started()) { t_green[2].start(); stuck = false; }
        if (cyan[2].started() && green[3].started()) { t_green[3].start(); stuck = false; }
    } else if (v3()) {
        if (cyan[2].started()) { t_cyan[2].start(); stuck = false; } 
        if (green[4].started()) { t_green[4].start(); stuck = false; } 
        if (cyan[1].started() && green[2].started()) { t_cyan[1].start(); stuck = false; }
    } else if (v4()) {
        if (cyan[3].started()) { t_cyan[3].start(); stuck = false; }
        if (cyan[2].started() && green[3].started()) { t_cyan[2].start(); stuck = false; } 
    }
    if (stuck) { 
        reset.start(); 
        t_reset.start(); 
    } else {
        if (get_state(document.title, "up"    )) go_up    .start();
        if (get_state(document.title, "left"  )) go_left  .start();
        if (get_state(document.title, "right" )) go_right .start();
        if (get_state(document.title, "noop"  )) t_noop   .start();
    }
};

t_red[0].starts(_ => {
    red[0].stop();
    if (h1()) red[1].start(); else red[2].start();
    start_touches();
});
t_red[1].starts(_ => {
    red[1].stop();
    if (h2()) red[2].start(); else red[3].start();
    start_touches();
});
t_red[2].starts(_ => {
    red[2].stop();
    if (h3()) red[3].start(); else red[4].start();
    if (red[3].started() && red[4].started()) {
        set_state(document.title, "right");
        right.start();
    }
    start_touches();
});
t_red[3].starts(_ => {
    red[3].stop();
    red[4].start();
    start_touches();
});

t_blue[4].starts(_ => {
    blue[4].stop();
    if (h3()) blue[3].start(); else blue[2].start();
    start_touches();
});
t_blue[3].starts(_ => {
    blue[3].stop();
    if (h2()) blue[2].start(); else blue[1].start();
    start_touches();
});
t_blue[2].starts(_ => {
    blue[2].stop();
    if (h1()) blue[1].start(); else blue[0].start();
    if (blue[0].started() && blue[1].started()) {
        set_state(document.title, "left");
        left.start();
    }
    start_touches();
});
t_blue[1].starts(_ => {
    blue[1].stop();
    blue[0].start();
    start_touches();
});

t_cyan[0].starts(_ => {
    cyan[0].stop();
    if (v1()) cyan[1].start(); else cyan[2].start();
    start_touches();
});
t_cyan[1].starts(_ => {
    cyan[1].stop();
    if (v2()) cyan[2].start(); else cyan[3].start();
    start_touches();
});
t_cyan[2].starts(_ => {
    cyan[2].stop();
    if (v3()) cyan[3].start(); else cyan[4].start();
    if (cyan[3].started() && cyan[4].started()) {
       set_state(document.title, "noop");
       noop.start();
    }
    start_touches();
});
t_cyan[3].starts(_ => {
    cyan[3].stop();
    cyan[4].start();
    start_touches();
});

t_green[4].starts(_ => {
    green[4].stop();
    if (v3()) green[3].start(); else green[2].start();
    start_touches();
});
t_green[3].starts(_ => {
    green[3].stop();
    if (v2()) green[2].start(); else green[1].start();
    start_touches();
});
t_green[2].starts(_ => {
    green[2].stop();
    if (v1()) green[1].start(); else green[0].start();
    if (green[0].started() && green[1].started()) {
        set_state(document.title, "up");
        up.start();
    }
    start_touches();
});
t_green[1].starts(_ => {
    green[1].stop();
    green[0].start();
    start_touches();
});

blue  [0].stop  ();
blue  [1].stop  ();
blue  [2].stop  ();
blue  [3].start ();
blue  [4].start ();
red   [0].start ();
red   [1].start ();
red   [2].stop  ();
red   [3].stop  ();
red   [4].stop  ();
green [0].stop  ();
green [1].stop  ();
green [2].stop  ();
green [3].start ();
green [4].start ();
cyan  [0].start ();
cyan  [1].start ();
cyan  [2].stop  ();
cyan  [3].stop  ();
cyan  [4].stop  ();

if (get_state(document.title, "up"   )) up.start();
if (get_state(document.title, "left" )) left.start();
if (get_state(document.title, "right")) right.start();
if (get_state(document.title, "noop" )) noop.start();
start_touches();
