const initial_state = {
	pages: {},
	version: '0'
};

//initial_state['root'      ] = {};
//initial_state['root/left' ] = {};
//initial_state['root/right'] = {};

let state = null;
//let page_state = null;

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

// export const init_score = score => {
// 	// load state
// 	let state_string = localStorage.getItem('trees');
// 	if (state_string === null) {
// 		state = initial_state;
// 	} else {
// 		state = JSON.parse(state_string);
// 		if (!('version' in state)) {
// 			state = initial_state;
// 		} else {
// 			if (state.version !== initial_state.version) {
// 				state = initial_state;
// 			}	
// 		}
// 	}
// 	// check current page
// 	let page = null;
// 	const tokens = location.pathname.split('/');
// 	if (tokens[tokens.length - 1].length === 0) {
// 		page = tokens[tokens.length - 2];
// 	} else {
// 		page = tokens[tokens.length - 1];
// 	}
// 	if (page !== state.page) {
// 		save_state();
// 		location.replace('../' + state.page);
// 		return;
// 	}
// 	if (!(page in state)) {
// 		state[page] = {};
// 		state.score += score;
// 		save_state();
// 	}
// 	page_state = state[page];
// };

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





// continue from here




// export const get_page = (page, key) => {
// 	if (key === undefined) {
// 		if (!(page in state)) {
// 			state[page] = {};
// 		}
// 		return state[page];
// 	}
// 	return state[page][key];
// };

// export const get_page_state = key => {
// 	const page_state = get_state(get_page());
// 	if (!(key in page_state)) {
// 		return false;
// 	} else {
// 		return page_state[key];
// 	}
// };

// export const set_page_state = (key, value) => {
// 	if (value === undefined) {
// 		value = true;
// 	}
// 	set_state(get_page(), key, value);
// };

// export const get_score = () => {
// 	return state.score;
// };

// export const get_solved = key => {
// 	return get_page_state(key);
// };

// export const set_solved = key => {
// 	if (!get_solved(key)) {
// 		--state.score;
// 		set_page_state(key);
// 	}
// };
