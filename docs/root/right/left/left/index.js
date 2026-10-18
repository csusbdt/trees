import '../../../../canvasapp.js';

const fill_0       = g_frame(i_fill_0  );
const fill_1       = g_frame(i_fill_1  );
const up_0         = g_frame(i_up_0    );
const up_1         = g_frame(i_up_1    );

const fill_0_closing = g_once(g_frames([i_blank]));
const fill_1_closing = g_once(g_frames([i_blank]));
const up_0_closing   = g_once(g_frames([i_blank]));

const t_fill_0     = g_touch(i_fill_0  );
const t_fill_1     = g_touch(i_fill_1  );
const t_up_0       = g_touch(i_up_0    );
const t_up_1       = g_touch(i_up_1    );

fill_0_closing.starts(_ => {
    fill_0.stop();
    if (up_1.started()) {
        up_1.stop();
    }
    fill_1.start();
    up_0.start();
    t_up_0.start(); 
    t_fill_1.start();
});


fill_1_closing.starts(_ => {
    fill_1.stop();
    if (!up_0.started()) {
        up_1.start();
        t_up_1.start();
    }
    fill_0.start();
    t_fill_0.start();
});

up_0_closing.starts(_ => {
    fill_1.stop();
    fill_0.start();
    up_1.start();
    t_up_1.start(); 
    t_fill_0.start();
});

t_fill_0.starts(_ => {
    assert(fill_0.started);
    fill_0_closing.start();
});

t_fill_1.starts(_ => {
    assert(fill_1.started);
    fill_1_closing.start();
});

t_up_0.starts(_ => {
    up_0.stop();
    up_0_closing.start();
});

t_up_1.starts(g_go_up);

window.addEventListener('load', e => {
    get_state(document.title);
    fill_0.start();
    t_fill_0.start();
});
