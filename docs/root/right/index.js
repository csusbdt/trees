import '../../canvasapp.js';

const border = g_frame(i_border);
const lines  = g_frame(i_lines );
const arrows = g_frame(i_arrows);
const player = g_frame(i_player);
const small  = g_frame(i_small, 1/8,   0, 200);
const big    = g_frame(i_big  , 1/8, 200, 400);
const up     = g_frame(i_up    );
const left   = g_frame(i_left  );
const right  = g_frame(i_right );

const go_up    = g_touch(i_up   );
const go_left  = g_touch(i_left );
const go_right = g_touch(i_right);

// +-----+-----+
// | t00 | t10 |
// +-----+-----+
// | t01 | t11 |
// +-----+-----+
// | t02 | t12 |
// +-----+-----+

const t00 = g_touch(g_rect(760 +   0, 220 +   0,  960 +   0, 420 +   0));
const t01 = g_touch(g_rect(760 +   0, 220 + 200,  960 +   0, 420 + 200));
const t02 = g_touch(g_rect(760 +   0, 220 + 400,  960 +   0, 420 + 400));
const t10 = g_touch(g_rect(760 + 200, 220 +   0,  960 + 200, 420 +   0));
const t11 = g_touch(g_rect(760 + 200, 220 + 200,  760 + 400, 220 + 400));
const t12 = g_touch(g_rect(760 + 200, 220 + 400,  960 + 200, 420 + 400));

const going_left = g_once([
    g_frame(i_player, 3/8,    0, 200), 
    g_frame(i_player, 1/8,  -67, 200),
    g_frame(i_player, 1/8, -134, 200),
    g_frame(i_player, 1/8, -200, 200),
    g_frame(i_left,  3/8)
]);

const going_right = g_once([
    g_frame(i_player, 3/8,    0, 400), 
    g_frame(i_player, 1/8,  -67, 400),
    g_frame(i_player, 1/8, -134, 400),
    g_frame(i_player, 1/8, -200, 400),
    g_frame(i_right,  3/8)
]);

go_up.starts(g_go_up);

go_left.starts(g_go_left);
go_right.starts(g_go_right);

going_left.starts(g_go_left);
going_right.starts(g_go_right);

const can_move_left = _ => {
    if (player.x === 0) return false;
    if (small.x  === 0 && small.y === player.y) return false;
    if (big.x    === 0 && big.y   === player.y) return false;
    return true;
};

const can_move_right = _ => {
    if (player.x === 200) return false;
    if (small.x  === 200 && small.y === player.y) return false;
    return true;
};

const can_move_up = _ => {
    if (player.y === 0) return false;
    if (small.x  === player.x && small.y === player.y - 200) return false;
    if (big.x    === player.x && big.y   === player.y - 200) return false;
    return true;
};

const can_move_down = _ => {
    if (player.y === 400) return false;
    if (big.x    === player.x && big.y   === player.y + 200) return false;
    return true;
};

t00.starts(_ => {
    if (player.x === 200 && player.y === 0) {
        if (small.x === 200 && small.y === 0) small.x = 0;
        player.x = 0;
    } else if (player.x === 0 && player.y === 200) {
        player.y = 0;
    } else assert(false);
    player.start(); // to set the dirty flag
    start_touches();
});

t01.starts(_ => {
    if (player.x === 0 && player.y === 0) {
        if (small.x === 0 && small.y === 0) small.y = 200;
        player.y = 200;
    } else if (player.x === 200 && player.y === 200) {
        if (small.x === 200 && small.y === 200) small.x = 0;
        player.x = 0;
    } else if (player.x === 0 && player.y === 400) {
        player.y = 200;
    }
    // check for exit
    if (small.x === 0 && small.y === 200) {
        player.start();
    } else {
        player.stop();
        set_state("root/right", "left", true);
        going_left.start();
        return;
    }
    start_touches();
});

t02.starts(_ => {
    if (player.x === 0 && player.y === 200) {
        assert(small.x === 0 && small.y === 200);
        small.y = 400;
        player.y = 400;
    } else {
        assert(player.x === 200 && player.y === 400);
        if (small.x === 200 && small.y === 400) small.x = 0;
        player.x = 0;
    } 
    if (small.x === 0 && small.y === 400) {
        player.start();
    } else {
        player.stop();
        set_state("root/right", "right", true);
        going_right.start();
        return;
    }
    start_touches();
});

t10.starts(_ => {
    if (player.x === 0 && player.y === 0) {
        if (small.x === 0 && small.y === 0) small.x = 200;
        player.x = 200;
    } else if (player.x === 200 && player.y === 200) {
        if (big.y === 200) {
            if (small.x === 200 && small.y === 200) small.y = 0;
            big.y = 0;
        }
        player.y = 0;
    } else assert(false);
    player.start();
    start_touches();
});

t11.starts(_ => {
    if (player.x === 200 && player.y === 0) {
        if (small.x === 200 && small.y === 0) small.y = 200;
        if (big.y === 0) big.y = 200;
        player.y = 200;
    } else if (player.x === 0 && player.y === 200) {
        if (small.x === 0 && small.y === 200) small.x = 200;
        player.x = 200;
    } else if (player.x === 200 && player.y === 400) {
        if (big.y === 400) {
            if (small.x === 200 && small.y === 400) small.y = 200;
            big.y = 200;
        }
        player.y = 200;
    }
    player.start();
    start_touches();
});

t12.starts(_ => {
    if (player.x === 200 && player.y === 200) {
        if (small.x === 200 && small.y === 200) small.y = 400;
        if (big.y === 200) big.y = 400;
        player.y = 400;
    } else if (player.x === 0 && player.y === 400) {
        if (small.x === 0 && small.y === 400) small.x = 200;
        player.x = 200;
    }
    player.start();
    start_touches();
});

const start_touches = _ => {
    go_up.start();
    if (get_state("root/right", "left")) {
        go_left.start();
    }
    if (get_state("root/right", "right")) {
        go_right.start();
    }
    if (player.x === 0 && player.y === 0) {
        if (can_move_right()) t10.start();
        if (can_move_down() ) t01.start();
    } else if (player.x === 0 && player.y === 200) {
        if (can_move_up()   ) t00.start();
        if (can_move_right()) t11.start();
        if (can_move_down() ) t02.start();
    } else if (player.x === 0 && player.y === 400) {
        if (can_move_up()   ) t01.start();
        if (can_move_right()) t12.start();
    } else if (player.x === 200 && player.y === 0) {
        if (can_move_left()) t00.start();
        if (can_move_down()) t11.start();
    } else if (player.x === 200 && player.y === 200) {
        if (can_move_up()  ) t10.start();
        if (can_move_left()) t01.start();
        if (can_move_down()) t12.start();
    } else if (player.x === 200 && player.y === 400) {
        if (can_move_up()  ) t11.start();
        if (can_move_left()) t02.start();
    } else assert(false);
};

window.addEventListener('load', e => {
    lines.start();
    border.start();
    arrows.start();
    player.start();
    small.start();
    big.start();
    up.start();
    if (get_state("root/right", "left")) {
        left.start();
    }
    if (get_state("root/right", "right")) {
        right.start();
    }
    start_touches();
});
