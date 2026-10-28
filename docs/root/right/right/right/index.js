import '../../../../canvasapp.js' ;
import "../../../../music.js"     ;

const base      = g_frame(i_base      ).start();
const window    = g_frame(i_window    );
const hard_on   = g_frame(i_hard_on   );
const hard_off  = g_frame(i_hard_off  );
const door      = g_frame(i_door      );
const here      = g_frame(i_here, default_duration, 0, 0, default_z + 1).start();
const up        = g_frame(i_up        );
const left      = g_frame(i_left      );
const right     = g_frame(i_right     );
const play      = g_frame(i_play      ).start();
const pause     = g_frame(i_pause     );
const kg_closed = g_frame(i_kg_0, default_duration, 0, 0, default_z + 2);
const kg_opened = g_frame(i_kg_3, default_duration, 0, 0, default_z + 2);

const person = g_loop(g_frames([ 
    i_blank, i_blank, i_blank, i_blank, i_1, i_2, i_3, i_4, i_5, i_6, i_7, i_8, i_9
], .4));

const kg_closing = g_once(g_frames([ i_kg_2, i_kg_1 ]), default_z + 2);
const kg_opening = g_once(g_frames([ i_kg_1, i_kg_2 ]), default_z + 2);

const t_hard_on  = g_touch(i_hard_on   );
const t_hard_off = g_touch(i_hard_off  );
const t_up       = g_touch(i_up        );
const t_left     = g_touch(i_left      );
const t_right    = g_touch(i_right     );
const t_play     = g_touch(i_play      );
const t_pause    = g_touch(i_pause     );
const t_kg_open  = g_touch(i_kg_0      ).set_sfx(g_play_boin);
const t_kg_close = g_touch(i_kg_3      );

const on_end_music = e => {
	clear_touchables();
    pause.stop();
    person.stop();
    play.start();
    start_touches();
};

const music = g_music("Washington_Post_1924.mp3", on_end_music, 1, 3);

const start_touches = _ => {
    if (kg_opened.started()) {
        t_kg_close.start();
        return;
    } else if (kg_closed.started()) {
        t_kg_open.start();
    }
    if (person.paused()) {
        t_play.start();
    } else if (person.started()) {
        t_pause.start();
    } else {
        assert(person.stopped());
        t_play.start();
    }
    if (hard_on.started()) {
        t_hard_off.start();
        t_up.start();
        t_left.start();
        t_right.start();
    } else {
        t_hard_on.start();
    }
};

t_kg_open .stops(kg_closed).starts(kg_opening);
t_kg_close.stops(kg_opened).starts(kg_closing);

kg_opening.starts(kg_opened, start_touches);
kg_closing.starts(kg_closed, start_touches);

t_up.starts(_ => {
    g_go_up();
});

t_left.starts(_ => {
    set_state(document.title, "left")
    g_go_left();
});

t_right.starts(_ => {
    set_state(document.title, "right")
    g_go_right();
});

t_hard_on.stops(hard_off);
t_hard_on.starts(hard_on, up, left, right, start_touches);
t_hard_on.starts(_ => {
    set_state(document.title, "hard", true);
});
    
t_hard_off.stops(hard_on, up, left, right);
t_hard_off.starts(hard_off, start_touches);
t_hard_off.starts(_ => {
    set_state(document.title, "hard", false);
});

t_play.starts(_ => {
    person.start();
    music.start();
    play.stop();
    pause.start();
    start_touches();
    if (kg_opened.stopped() && kg_closed.stopped()) {
        kg_closed.start();
        t_kg_open.start();
    }
});

t_pause.starts(_ => {
    pause.stop();
    play.start();
    person.pause();
    music.stop();
    start_touches();
});

//t_where.stops(where);

// t_where.starts(_ => {
//     if (person.started()) {
//         person.pause();
//         music.stop();
//         where_closing.start();
//     } else if (person.paused()) {
//         where_closing.start();
//     } 
// });

// where_closing.starts(_ => {
//     person.stop();
//     music.stop();
//     here.start();
//     play.start();
//     start_touches();
// });

// where_opening.starts(_ => {
//     play.stop();
//     pause.start();
//     where.start();
//     person.start();
//     music.start();
//     start_touches();
// });

if (get_state(document.title, "right")) door  .start();
if (get_state(document.title, "left" )) window.start();
if (get_state(document.title, "hard" )) {
    hard_on.start();
    up.start();
    left.start();
    right.start();
} else {
    hard_off.start();
}

start_touches();
