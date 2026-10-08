import '../../canvasapp.js';
import "../../music.js";

// vars

const ship_dur   = 4/8;
const blob_dur   = 1/8;

// loops

const up_opened     = g_loop(g_frames(i_up_2));
const left_opened   = g_loop(g_frames(i_left_2));
const right_opened  = g_loop(g_frames(i_right_2));
const play_opened   = g_loop(g_frames(i_play_music_2));
const pause_opened  = g_loop(g_frames(i_pause_music_2));
const gun           = g_loop(g_frames(i_gun_0), blob_dur);

const ship          = g_loop(g_frames([ i_ship_0, i_ship_1, i_ship_2, i_ship_1 ], ship_dur));

// onces

const up_closing    = g_once(g_frames([i_up_1, i_up_0, i_blank]));
const left_closing  = g_once(g_frames([i_left_1, i_left_0, i_blank]));
const right_closing = g_once(g_frames([i_right_1, i_right_0, i_blank]));
const play_closing  = g_once(g_frames([i_play_music_1, i_play_music_0, i_blank]));
const pause_closing = g_once(g_frames([i_pause_music_1, i_pause_music_0, i_blank]));

const play_opening  = g_once(g_frames([i_play_music_0, i_play_music_1]));
const pause_opening = g_once(g_frames([i_pause_music_0, i_pause_music_1]));

const gun_firing    = g_once(g_frames(i_gun_1), blob_dur);

const blob_0        = g_once(g_frames([ i_blob_0_0, i_blob_0_1, i_blob_0_2, i_blob_0_3, i_blob_0_3 ], ship_dur));
const blob_1        = g_once(g_frames([ i_blob_1_0, i_blob_1_1, i_blob_1_2, i_blob_1_3, i_blob_1_4, i_blob_1_5 ], ship_dur));
const blob_2        = g_once(g_frames([ i_blob_2_0, i_blob_2_1, i_blob_2_2, i_blob_2_3, i_blob_2_3 ], ship_dur));
const blob_3        = g_once(g_frames([ i_blob_3_0, i_blob_3_1, i_blob_3_2, i_blob_3_3, i_blob_3_4, i_blob_3_5 ], ship_dur));

// touches

const go_up         = g_touch(g_circle(963, 276, 56));
const go_left       = g_touch(i_left_2);
const go_right      = g_touch(i_right_2);
const play_music    = g_touch(i_play_music_2);
const pause_music   = g_touch(i_pause_music_2);
const fire_gun      = g_touch(i_gun_0);

// event handlers

window.addEventListener('load', e => {
    up_opened.start();
    play_opened.start();
    ship.start();
    gun.start();
    if (get_state("root/left", "left")) {
        left_opened.start();
        go_left.start();
    }
    if (get_state("root/left", "right")) {
        right_opened.start();
        go_right.start();
    }
    start_touchables();
});

const on_end_music = e => {
	clear_touchables();
    set_state("root/left", "left", true);
    pause_opened.stop();
    pause_closing.start();
    left_opened.start();
};

const music = g_music("say_it_isnt_so.mp3", on_end_music, .4);

// helpers

const start_touchables = _ => {
    go_up.start();
    if (get_state("root/left", "left")) {
        go_left.start();
    }
    if (get_state("root/left", "right")) {
        go_right.start();
    }
    if (g_is_music_playing) {
        pause_music.start();
    } else {
        play_music.start();
    } 
    fire_gun.start();
};

// once configuration

up_closing.starts(g_go_up);
left_closing.starts(g_go_left);
right_closing.starts(g_go_right);

play_closing.starts(pause_opening, music);
pause_closing.stops(music).starts(play_opening);

play_opening.starts(play_opened, start_touchables);
pause_opening.starts(pause_opened, start_touchables);

gun_firing.stops(ship);

gun_firing.starts(gun, _ => {
    if (ship.frame_index === 0) { 
        blob_0.start();
    } else if (ship.frame_index === 1) {
        blob_1.start();
    } else if (ship.frame_index === 2) {
        blob_2.start();
    } else if (ship.frame_index === 3) {
        blob_3.start();
    }
});

blob_0.starts(ship, _ => {
    set_state("root/left", "right", true);
    right_opened.start();
    start_touchables();
});

blob_1.starts(ship, start_touchables);

blob_2.starts(ship, _ => {
    set_state("root/left", "right", true);
    right_opened.start();
    start_touchables();
});

blob_3.starts(ship, start_touchables);

go_up.stops(up_opened);
go_right.stops(right_opened);
go_left.stops(left_opened);
pause_music.stops(pause_opened);
play_music.stops(play_opened);
fire_gun.stops(gun);

go_up.starts(up_closing);
go_right.starts(right_closing);
go_left.starts(left_closing);
pause_music.starts(pause_closing);
play_music.starts(play_closing);
fire_gun.starts(gun_firing);
