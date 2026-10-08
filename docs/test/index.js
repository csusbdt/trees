import g from '../canvasapp.js';
import "../sfx.js" ;

const bop      = g_frame(i_bop).start();
const play_bop = g_touch(i_bop).start().starts(g_play_bop);

const start_touchables = _ => {
    play_bop.start();
};

play_bop.starts(start_touchables);

window.addEventListener('load', e => {});

