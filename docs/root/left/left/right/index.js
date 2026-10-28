import '../../../../canvasapp.js';

const red   = g_frame(i_red   );
const green = g_frame(i_green );
const blue  = g_frame(i_blue  );
const R_G_B = g_frame(i_R_G_B );
const R_G   = g_frame(i_R_G   );
const R_B   = g_frame(i_R_B   );
const G_B   = g_frame(i_G_B   );
const R     = g_frame(i_R     );
const B     = g_frame(i_B     );
const G     = g_frame(i_G     );

const base       = g_frame(i_base    );
const on_on      = g_frame(i_on_on   );
const on_off     = g_frame(i_on_off  );
const off_on     = g_frame(i_off_on  );
const off_off    = g_frame(i_off_off );

const twirl      = g_loop(g_frames([i_twirl_0, i_twirl_1, i_twirl_2, i_twirl_3, i_twirl_4, i_twirl_3, i_twirl_2, i_twirl_1 ]));

const t_on       = g_touch(i_on_on   );
const t_off      = g_touch(i_off_on  );

const start_touches = _ => {
    if (on_on.started()) {
        t_off.start();
    } else {
        assert(off_on.started());
        t_on.start();        
    }
};

t_on .stops(on_off , off_on                        );
t_off.stops(on_on  , off_off, twirl                );
t_on .starts(on_on , off_off, twirl, start_touches );
t_off.starts(on_off, off_on        , start_touches );

base.start();
if (get_state(document.title, "beam") === null) {
    set_state(document.title, "beam", "on");
}
if (get_state(document.title, "beam") === "on") {
    on_on.start();
    off_off.start();
    twirl.start();
} else {
    on_off.start();
    off_on.start();
}
start_touches();
