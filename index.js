var ADD_TODO = {
	type: 'ADD-TODO',
	todo:
		{
			id: 0,
			name:
				'Learn Redux',
			complete:
				false,
		}
};

var REMOVE_TODO = {
	type: 'REMOVE_TODO',
	id: 0,
};

var TAGGLE_TODO = {
	type: 'TAGGLE_TODO',
	id: 0,
};

var ADD_GOAL = {
	type: 'ADD_GOAL',
	goal: {
		id: 0,
		name: 'Run a Marathon'
	}
};

var REMOAVE_GOAL = {
	type: 'REMOVE_GOAL',
	id: 0,
};

// The store should have four parts
// 1. the state
// 2. Get the state. (getState)
// 3. Listen to changes on the state. (Subscribe)
// 4. Update the state (dispatch)

function createStore() {
	
	// a collection of data
	let state = [];
	// a collection of listeners which watching the change of states.
	let listeners = [];
	
	/*
	* return: current state
	* */
	const getState = () => state;
	
	/*
	* let listeners subscribe to the change of state
	* pram: listener functions, reacts to the change of state
	* return: a function which allow the pram listener to unsubscribe the state*/
	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter((l => l !== listener))
		}
	};
	
	/*
	* change the state
	* pram: an action object
	* return: void
	* */
	const dispatch = (action) => {
		// change of state
		state = todos(state, action);
		// loop over subscribed listeners coz state changes.
		listeners.forEach((listener) => listener())
	}
	
	return {
		getState,
		subscribe,
		dispatch,
	}
}

// a function add TODOs to state
function todos(state, action) {
	if (action.type === 'ADD_TODO') {
		return state.concat([action.todo])
	}
	return state;
}

const store = createStore();

const unsubscribe = store.subscribe(() =>{
	console.log(`current state is `, store.getState());
});

store.dispatch({
	type: 'ADD_TODO',
	todo:
		{
			id: 0,
			name:
				'Learn Redux',
			complete:
				false,
		}
});
