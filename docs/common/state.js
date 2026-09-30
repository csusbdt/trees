const initial_state = {
	pages: {},
	version: '0'
};

let state = null;

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

export const save_state = () => {
	localStorage.setItem('trees', JSON.stringify(state));
};

export const get_state = (page, key) => {
	if (page === undefined) {
		return state;
	}
	if (!(page in state)) {
		state[page] = {};
	}
	if (key === undefined) {
		return state[page];
	}
	if (!(key in state[page])) {
		state[page][key] = null;
	}
	return state[page][key];
};

export const set_state = (page, key, value) => {
	if (key === undefined) {
		throw new Error('set_state called without key');
	}
	if (value === undefined) {
		value = true;
	}
	if (!(page in state)) {
		state[page] = {};
	}
	state[page][key] = value;
	save_state();
};

export const reset_state = () => {
	state = initial_state;
	save_state();
};
