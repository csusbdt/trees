import '../../../../canvasapp.js';

const base       = g_frame(i_base      ).start();
const up         = g_frame(i_up        );
const left       = g_frame(i_left      );
const right      = g_frame(i_right     );
const people     = g_frame(i_people    );
const robots     = g_frame(i_build     );
const reset_on   = g_frame(i_reset_on  );
const build_on   = g_frame(i_build_on  );
const save_on    = g_frame(i_save_on   );
const reset_off  = g_frame(i_reset_off );
const build_off  = g_frame(i_build_off );
const save_off   = g_frame(i_save_off  );

const smoke      = g_loop(g_frames([i_smoke_0, i_smoke_1, i_smoke_2 ]));

const t_up       = g_touch(i_up        );
const t_left     = g_touch(i_left      );
const t_right    = g_touch(i_right     );
const t_reset    = g_touch(i_reset_off );
const t_build    = g_touch(i_build_off );
const t_save     = g_touch(i_save_off  );

const start_touches = _ => {
    if (reset_on.started()) {
        set_state(document.title, "selected", "reset");
        t_up.start();
        t_build.start();
        t_save.start();
    } else if (build_on.started()) {
        set_state(document.title, "selected", "build");
        t_left.start();
        t_reset.start();
        t_save.start();
    } else {
        assert(save_on.started());
        set_state(document.title, "selected", "save");
        t_right.start();
        t_build.start();
        t_reset.start();
    }
};

t_up    .starts(g_go_up    );
t_left  .starts(g_go_left  );
t_right .starts(g_go_right );

t_reset .stops(left, right, robots, smoke, build_on, save_on  );
t_build .stops(up  , right, people       , reset_on, save_on  );
t_save  .stops(up  , left , robots, smoke, reset_on, build_on );

t_reset.starts(up  , people, reset_on        , start_touches);
t_build.starts(left, robots, smoke, build_on , start_touches);
t_save.starts(right, people, save_on         , start_touches);

if (get_state(document.title, "selected") === "reset") {
    up.start();
    people.start();
    reset_on.start();
    build_off.start();
    save_off.start();
} else if (get_state(document.title, "selected") === "build") {
    left.start();
    robots.start();
    smoke.start();
    reset_off.start();
    build_on.start();
    save_off.start();
} else {
    set_state(document.title, "selected", "save");
    right.start();
    people.start();
    reset_off.start();
    build_off.start();
    save_on.start();
}

start_touches();
