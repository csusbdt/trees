import '../../../canvasapp.js';
import '../../../state.js';

const base          = g_frame(i_base        );
const up_arrow      = g_frame(i_up_arrow    );
const left_arrow    = g_frame(i_left_arrow  );
const right_arrow   = g_frame(i_right_arrow );

const zero_a_0      = g_frame(i_zero_a_0    );
const zero_a_1      = g_frame(i_zero_a_1    );
const zero_a_2      = g_frame(i_zero_a_2    );
const zero_b_0      = g_frame(i_zero_b_0    );
const zero_b_1      = g_frame(i_zero_b_1    );
const zero_b_2      = g_frame(i_zero_b_2    );

const one_a_0       = g_frame(i_one_a_0     );
const one_a_1       = g_frame(i_one_a_1     );
const one_a_2       = g_frame(i_one_a_2     );
const one_b_0       = g_frame(i_one_b_0     );
const one_b_1       = g_frame(i_one_b_1     );
const one_b_2       = g_frame(i_one_b_2     );

const t_zero_0      = g_touch(i_zero_a_0);
const t_zero_1      = g_touch(i_zero_a_1);
const t_zero_2      = g_touch(i_zero_a_2);
const t_one_0       = g_touch(i_one_a_0 );
const t_one_1       = g_touch(i_one_a_1 );
const t_one_2       = g_touch(i_one_a_2 );

const t_up_arrow    = g_touch(i_up_arrow    );
const t_left_arrow  = g_touch(i_left_arrow  );
const t_right_arrow = g_touch(i_right_arrow );

const a       = [ 0                , 0                , 0                ];
const b       = [ 0                , 1                , 0                ];

const a_zeros = [ zero_a_0 , zero_a_1 , zero_a_2 ];
const a_ones  = [ one_a_0  , one_a_1  , one_a_2  ];
const b_zeros = [ zero_b_0 , zero_b_1 , zero_b_2 ];
const b_ones  = [ one_b_0  , one_b_1  , one_b_2  ];

const t_zeros = [ t_zero_0 , t_zero_1 , t_zero_2 ];
const t_ones  = [ t_one_0  , t_one_1  , t_one_2  ];

t_left_arrow.starts(_ => { set_state(document.title, "left") });
t_right_arrow.starts(_ => { set_state(document.title, "right") });

t_up_arrow.starts(g_go_up);
t_left_arrow.starts(g_go_left);
t_right_arrow.starts(g_go_right);

const update = _ => {
    b[0] = a[0] ^ 0;
    b[1] = a[1] ^ 1;
    b[2] = a[2] ^ 0;
    if (b[0] === 0) {
        zero_b_0.start();
        one_b_0.stop();
    } else {
        zero_b_0.stop();
        one_b_0.start();
    }
    if (b[1] === 0) {
        zero_b_1.start();
        one_b_1.stop();
    } else {
        zero_b_1.stop();
        one_b_1.start();
    }
    if (b[2] === 0) {
        zero_b_2.start();
        one_b_2.stop();
    } else {
        zero_b_2.stop();
        one_b_2.start();
    }
    for (let i = 0; i < 3; ++i) {
        if (a[i] === 0) {
            a_zeros[i].start();
            a_ones[i].stop();
            t_zeros[i].start();
        } else {
            a_zeros[i].stop();
            a_ones[i].start();
            t_ones[i].start();
        }
    }
    left_arrow.stop();
    up_arrow.stop();
    right_arrow.stop();
    if (b[0] == 1 && b[1] == 0 && b[2] == 0) {
        left_arrow.start();
        t_left_arrow.start();
    } else if (b[0] == 0 && b[1] == 1 && b[2] == 0) {
        up_arrow.start();
        t_up_arrow.start();
    } else if (b[0] == 0 && b[1] == 0 && b[2] == 1) {
        right_arrow.start();
        t_right_arrow.start();
    }
};

t_zero_0.starts(_ => { a[0] = 1; }, update);
t_zero_1.starts(_ => { a[1] = 1; }, update);
t_zero_2.starts(_ => { a[2] = 1; }, update);
t_one_0 .starts(_ => { a[0] = 0; }, update);
t_one_1 .starts(_ => { a[1] = 0; }, update);
t_one_2 .starts(_ => { a[2] = 0; }, update);

window.addEventListener('load', e => {
    get_state(document.title);
    base.start();
    update();
});
