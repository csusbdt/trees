import '../../../canvasapp.js';

const base       = g_frame(i_base     ).start();
const mouth      = g_frame(i_mouth    );
const mouth_on   = g_frame(i_mouth_on );
const hair       = g_frame(i_hair     );
const hair_on    = g_frame(i_hair_on  );
const left       = g_frame(i_left     );
const eyes       = g_frame(i_eyes     );
const eyes_on    = g_frame(i_eyes_on  );
const right      = g_frame(i_right    );

++eyes.z_index;

const t_mouth_on = g_touch(i_mouth_on );
const t_hair_on  = g_touch(i_hair_on  );
const t_eyes_on  = g_touch(i_eyes_on  );

const t_mouth    = g_touch(i_mouth    );
const t_left     = g_touch(i_left     );
const t_right    = g_touch(i_right    );

const start_touches = _ => {
    t_mouth_on.start();
    t_hair_on .start();
    t_eyes_on .start();
    if  (mouth.started()) t_mouth.start();
    if  (left .started()) t_left .start();
    if  (right.started()) t_right.start();
};

t_mouth_on.starts(_ => {
    if (mouth.started()) {
        mouth.stop(); 
        mouth_on.stop(); 
    } else {
        mouth.start();
        mouth_on.start(); 
    }
}, start_touches);

t_hair_on.starts(_ => {
    if (hair.started()) {
        hair.stop(); 
        hair_on.stop(); 
        left.stop(); 
    } else {
        hair.start();
        hair_on.start(); 
        left.start(); 
    }
}, start_touches);

t_eyes_on.starts(_ => {
    if (eyes.started()) {
        eyes.stop(); 
        eyes_on.stop(); 
        right.stop(); 
    } else {
        eyes.start();
        eyes_on.start(); 
        right.start(); 
    }
}, start_touches);

t_mouth.starts(g_go_up    );
t_left .starts(g_go_left  );
t_right.starts(g_go_right );

get_state(document.title);
start_touches();
