const path_to_root = window.location.pathname.slice(0, window.location.pathname.indexOf("root/"));

const initial_state = {
	pages: {},
	version: '13'
};
initial_state.pages[path_to_root + "root/"] = {};

let state = null;

window.save_state = _ => {
	if (!(window.location.pathname in state.pages)) {
		state.pages[window.location.pathname] = {};
	}
	localStorage.setItem('tree', JSON.stringify(state));
};

let state_string = localStorage.getItem('tree');
if (state_string === null) {
	state = structuredClone(initial_state);
} else {
	state = JSON.parse(state_string);
	if (state.version !== initial_state.version) {
		state = structuredClone(initial_state);
		save_state();		
		location.replace(window.location.origin + path_to_root); 
	}
}

window.get_state = (key) => {
	if (key === undefined) {
		save_state();
		return state;
	}
	if (!(window.location.pathname in state.pages)) {
		state.pages[window.location.pathname] = {};
	}
	if (!(key in state.pages[window.location.pathname])) {
		set_state(key, null);
	}
	return state.pages[window.location.pathname][key];
};

window.set_state = (key, value) => {
	if (key === undefined) {
		save_state();
		return;
	}
	if (value === undefined) value = true;
	state.pages[window.location.pathname][key] = value;
	save_state();
};

window.reset_state = _ => {
	state = structuredClone(initial_state);
	save_state();
};
