const initial_state = {
	pages:   {},
	version: '2'
};
initial_state.pages.root = {};

let state = null;


window.save_state = () => {
	localStorage.setItem('trees', JSON.stringify(state));
};

let state_string = localStorage.getItem('trees');
if (state_string === null) {
	state = initial_state;
} else {
	state = JSON.parse(state_string);
	if (state.version !== initial_state.version) {
		state = initial_state;
		save_state();
	}	
}

window.get_state = (page, key) => {
	if (page === undefined) {
		return state;
	}
	if (!(page in state.pages)) {
		set_state(page);
	}
	if (key === undefined) {
		return state.pages[page];
	}
	if (!(key in state.pages[page])) {
		set_state(page, key, null);
	}
	return state.pages[page][key];
};

window.set_state = (page, key, value) => {
	if (page === undefined) {
		throw new Error('set_state called without page');
	}
	if (!(page in state.pages)) {
		state.pages[page] = {};
	} else if (typeof key === "string") {
		if (value === undefined) {
			state.pages[page][key] = true;
		} else {
			state.pages[page][key] = value;
		}
	}
	save_state();
};

window.reset_state = (page) => {
	if (page === undefined) {
		state = initial_state;
	}
	else {
		state.pages[page] = {};
	}
	save_state();
};

