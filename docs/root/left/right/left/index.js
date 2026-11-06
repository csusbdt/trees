import '../../../../canvasapp.js';

const base_0   = g_frame(i_base_0 ).set_z(9).start();
const base_1   = g_frame(i_base_1 ).set_z(9);
const base_2   = g_frame(i_base_2 ).set_z(9);
const red_0    = g_frame(i_red_0  ).set_z(9);
const red_1    = g_frame(i_red_1  );
const red_2    = g_frame(i_red_2  );
const green_0  = g_frame(i_green_0).set_z(9).start();
const green_1  = g_frame(i_green_1);
const green_2  = g_frame(i_green_2);
const blue_0   = g_frame(i_blue_0 ).set_z(9);
const blue_1   = g_frame(i_blue_1 );
const blue_2   = g_frame(i_blue_2 );
const r0       = (get_state(document.title, "right") ? g_frame(i_r0b) : g_frame(i_r0)).start();
const r1       = g_frame(i_r1     );
const r2       = (get_state(document.title, "right") ? g_frame(i_r2b) : g_frame(i_r2));
const g0       = (get_state(document.title, "up") ? g_frame(i_g0b) : g_frame(i_g0));
const g1       = g_frame(i_g1     );
const g2       = (get_state(document.title, "up") ? g_frame(i_g2b) : g_frame(i_g2));
const b0       = (get_state(document.title, "left") ? g_frame(i_b0b) : g_frame(i_b0)).start();
const b1       = g_frame(i_b1     );
const b2       = (get_state(document.title, "left") ? g_frame(i_b2b) : g_frame(i_b2));
const r0b      = g_frame(i_r0b    );
const g0b      = g_frame(i_g0b    );
const b0b      = g_frame(i_b0b    );

const o_r      = g_once([r1]);
const o_g      = g_once([g1]);
const o_b      = g_once([b1]);

const t_r0     = g_touch(i_r0     );
const t_r2     = g_touch(i_r2     );
const t_g0     = g_touch(i_g0     );
const t_g2     = g_touch(i_g2     );
const t_b0     = g_touch(i_b0     );
const t_b2     = g_touch(i_b2     );
const t_red    = g_touch(i_red_0  );
const t_green  = g_touch(i_green_0);
const t_blue   = g_touch(i_blue_0 );

const start_touches = _ => {
    if (r0.started()) t_r0.start();
    if (r2.started()) t_r2.start();
    if (g0.started()) t_g0.start();
    if (g2.started()) t_g2.start();
    if (b0.started()) t_b0.start();
    if (b2.started()) t_b2.start();
    if (red_0  .started()) t_red  .start();
    if (green_0.started()) t_green.start();
    if (blue_0 .started()) t_blue .start();
};

o_r.starts(r2, start_touches);
o_g.starts(g2, start_touches);
o_b.starts(b2, start_touches);

t_red.starts(_ => {
    set_state(document.title, "right");
    g_go_right();
});
t_green.starts(_ => {
    set_state(document.title, "up");
    g_go_up();
});
t_blue.starts(_ => {
    set_state(document.title, "left");
    g_go_left();
});

t_r0.stops(r0).starts(o_r);
t_r2.stops(r2, g2, b2, green_0, blue_0).starts(red_0, g0, b0, start_touches);

t_g0.stops(g0).starts(o_g);
t_g2.stops(r2, g2, b2, red_0, blue_0).starts(green_0, r0, b0, start_touches);

t_b0.stops(b0).starts(o_b);
t_b2.stops(r2, g2, b2, red_0, green_0).starts(blue_0, r0, g0, start_touches);

start_touches();
