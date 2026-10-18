import '../../../../canvasapp.js';

const dead      = g_frame(i_dead  ).start();
const up        = g_frame(i_up    ).start();
const left      = g_frame(i_left  ).start();
const right     = g_frame(i_right ).start();

const go_up     = g_touch(i_up    );
const go_left   = g_touch(i_left  );
const go_right  = g_touch(i_right );
const play_boin = g_touch(i_dead  );

const start_touchables = _ => {
    go_up     .start();
    go_left   .start();
    go_right  .start();
    play_boin .start();
};

go_up     .starts (g_go_up     );
go_left   .starts (g_go_left   );
go_right  .starts (g_go_right  );
play_boin .starts (start_touchables, g_play_boin );

window.addEventListener('load', e => {
    get_state(document.title);
    start_touchables();
});
