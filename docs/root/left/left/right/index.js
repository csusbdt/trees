import '../../../../canvasapp.js';

const red      = g_frame(i_red      ).start();
const green    = g_frame(i_green    ).start();
const blue     = g_frame(i_blue     ).start();
const RGB      = g_frame(i_RGB      );
const RG       = g_frame(i_RG       );
const RB       = g_frame(i_RB       );
const GB       = g_frame(i_GB       );
const R        = g_frame(i_R        );
const G        = g_frame(i_G        );
const B        = g_frame(i_B        );
const base     = g_frame(i_base     ).start();
const up       = g_frame(i_up       );
const left     = g_frame(i_left     );
const right    = g_frame(i_right    );
const beam_on  = g_frame(i_beam_on  ).start();
const beam_off = g_frame(i_beam_off );

const beam = g_loop(g_frames([
    i_twirl_0, i_twirl_1, i_twirl_2, i_twirl_3, 
    i_twirl_4, i_twirl_3, i_twirl_2, i_twirl_1 
])).start();

const red_dying           = g_once(g_frames([ i_red_0, i_red_1 ]));
const red_dying_chained   = g_once(g_frames([ i_red_0, i_red_1 ]));
const red_merging         = g_once(g_frames([ i_red_0, i_red_1, i_red_2, i_red_3 ]));
const green_dying         = g_once(g_frames([ i_green_0, i_green_1 ]));
const green_dying_chained = g_once(g_frames([ i_green_0, i_green_1 ]));
const green_merging       = g_once(g_frames([ i_green_0, i_green_1, i_green_2, i_green_3, i_green_4 ]));
const blue_dying          = g_once(g_frames([ i_blue_0, i_blue_1 ]));
const blue_dying_chained  = g_once(g_frames([ i_blue_0 ]));
const blue_merging        = g_once(g_frames([ i_blue_0, i_blue_1, i_blue_2, i_blue_3, i_blue_4 ]));

const t_beam_on           = g_touch(i_beam_on  );
const t_beam_off          = g_touch(i_beam_off );
const t_red_die           = g_touch(i_red      );
const t_red_merge         = g_touch(i_red      );
const t_green_die         = g_touch(i_green    );
const t_green_merge       = g_touch(i_green    );
const t_blue_die          = g_touch(i_blue     );
const t_blue_merge        = g_touch(i_blue     );
const t_go                = g_touch(i_R        );
const t_up                = g_touch(i_up       );
const t_left              = g_touch(i_left     );
const t_right             = g_touch(i_right    );

const start_touches = _ => {
    if (up    .started()) t_up    .start();
    if (left  .started()) t_left  .start();
    if (right .started()) t_right .start();
    if (beam_on.started()) {
        t_beam_off.start();
        if (red   .started()) t_red_die     .start();
        if (green .started()) t_green_die   .start();
        if (blue  .started()) t_blue_die    .start();
    } else {
        t_beam_on.start();
        if (red   .started()) t_red_merge   .start();
        if (green .started()) t_green_merge .start();
        if (blue  .started()) t_blue_merge  .start();
    }
    t_go.start();
};

t_up.starts(g_go_up);
t_left.starts(g_go_left);
t_right.starts(g_go_right);
t_beam_on.stops(beam_off, start_touches).starts(beam_on, beam, start_touches);
t_beam_on.starts(_ => set_state(document.title, "beam", true));
t_beam_off.stops(beam_on, beam, start_touches).starts(beam_off, start_touches);
t_beam_off.starts(_ => set_state(document.title, "beam", false));
t_red_die.stops(red).starts(red_dying);
t_green_die.stops(green).starts(green_dying);
t_blue_die.stops(blue).starts(blue_dying);
t_red_merge.stops(red).starts(red_merging);
t_green_merge.stops(green).starts(green_merging);
t_blue_merge.stops(blue).starts(blue_merging);

t_go.starts(_ => {
    if (beam_on.started()) {
        if      (red   .started()) { red.stop(); red_dying_chained.start(); }
        else if (green .started()) { green.stop(); green_dying_chained.start(); }
        else if (blue  .started()) { blue.stop(); blue_dying_chained.start(); }
        else if (R     .started()) { set_state(document.title, "right", true); g_go_right(); }
        else if (G     .started()) { set_state(document.title, "up"   , true); g_go_up   (); }
        else if (B     .started()) { set_state(document.title, "left" , true); g_go_left (); }
        else if (RG    .started()) g_reload();
        else if (RB    .started()) g_reload();
        else if (GB    .started()) g_reload();
        else if (RGB   .started()) g_reload();      
        else g_reload();
    } else {
        if      (red   .started()) { red.stop(); red_merging.start(); }
        else if (green .started()) { green.stop(); green_merging.start(); }
        else if (blue  .started()) { blue.stop(); blue_merging.start(); }
        else if (R     .started()) { set_state(document.title, "right", true); g_go_right(); }
        else if (G     .started()) { set_state(document.title, "up"   , true); g_go_up   (); }
        else if (B     .started()) { set_state(document.title, "left" , true); g_go_left (); }
        else if (RG    .started()) g_reload();
        else if (RB    .started()) g_reload();
        else if (GB    .started()) g_reload();
        else if (RGB   .started()) g_reload();
        else assert(false);
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

red_dying   .starts(start_touches);
green_dying .starts(start_touches);
blue_dying  .starts(start_touches);

red_merging.starts(_ => {
    if      (G  .started()) { G  .stop(); RG  .start(); }
    else if (B  .started()) { B  .stop(); RB  .start(); }
    else if (GB .started()) { GB .stop(); RGB .start(); }
    else R.start();
    if (green.started()) { 
        green.stop(); 
        green_merging.start(); 
    } else if (blue.started()) { 
        blue.stop(); 
        blue_merging.start(); 
    } else {
        start_touches();
    }        
});

green_merging.starts(_ => {
    if      (R  .started ()) { R  .stop(); RG  .start(); }
    else if (B  .started ()) { B  .stop(); GB  .start(); }
    else if (RB .started ()) { RB .stop(); RGB .start(); }
    else G.start(); 
    if (red.started()) { red.stop(); red_merging.start(); return; }
    else if (blue.started()) { blue.stop(); blue_merging.start(); return; }
    else start_touches();
});

blue_merging.starts(_ => {
    if      (R.started  ()) { R  .stop(); RB  .start(); }
    else if (G.started  ()) { G  .stop(); GB  .start(); }
    else if (RG.started ()) { RG .stop(); RGB .start(); }
    else B.start(); 
    if (red.started()) { red.stop(); red_merging.start(); return; }
    else if (green.started()) { green.stop(); green_merging.start(); return; }        
    else start_touches();
});

if (get_state(document.title, "up"   )) up    .start();
if (get_state(document.title, "left" )) left  .start();
if (get_state(document.title, "right")) right .start();

start_touches();
