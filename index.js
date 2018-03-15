// The store should have four parts
// 1. the state
// 2. Get the state. (getState)
// 3. Listen to changes on the state. (Subscribe)
// 4. Update the state (dispatch)

/*Lib code
 reducer functions must be pure functions.
 */
function createStore(reducer) {
	
	// a collection of data
	let state;
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
		state = reducer(state, action);
		// loop over subscribed listeners coz state changes.
		listeners.forEach((listener) => listener())
	}
	
	return {
		getState,
		subscribe,
		dispatch,
	}
}

// App code

// Action names
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// Action creators
function addTodoAction(todo) {
	return {
		type: ADD_TODO,
		todo,
	}
}

function removeTodoAction(id) {
	return {
		type: REMOVE_TODO,
		id,
	}
}

function toggleTodoAction(id) {
	return {
		type: TOGGLE_TODO,
		id,
	}
}

function addGoalAction(goal) {
	return {
		type: ADD_GOAL,
		goal,
	}
}

function removeGoalAction(id) {
	return {
		type: REMOVE_GOAL,
		id,
	}
}


// The Reducer function manage TODOs in state
function todos(todos = [], action) {
	switch (action.type) {
		case ADD_TODO:
			return todos.concat([action.todo]);
		case REMOVE_TODO:
			return todos.filter((todo) => todo.id !== action.id);
		case TOGGLE_TODO:
			return todos.map((todo) => todo.id !== action.id ? todo :
				Object.assign({}, todo, {complete: !todo.complete}));
		default:
			return todos;
	}
}

// The Reducer function manage Goals in state
function goals(goals = [], action) {
	switch (action.type) {
		case ADD_GOAL:
			return goals.concat([action.goal]);
		case REMOVE_GOAL:
			return goals.filter((goal) => goal.id !== action.id)
		default:
			return goals
	}
}

//
function app(state = {}, action) {
	return {
		todos: todos(state.todos, action),
		goals: goals(state.goals, action),
	}
}

const store = createStore(app)

store.subscribe(() => {
	console.log('The new state is: ', store.getState())
});

store.dispatch(addTodoAction({
	id: 0,
	name: 'Walk the dog',
	complete: false,
}));

store.dispatch(addTodoAction({
	id: 1,
	name: 'Wash the car',
	complete: false,
}));

store.dispatch(addTodoAction({
	id: 2,
	name: 'Go to the gym',
	complete: true,
}));

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(addGoalAction({
	id: 0,
	name: 'Learn Redux'
}));

store.dispatch(addGoalAction({
	id: 1,
	name: 'Lose 20 pounds'
}));

store.dispatch(removeGoalAction(0));

