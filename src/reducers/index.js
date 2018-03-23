import goals from "./goals";
import loading from "./loading";
import todos from "./todos";
import {combineReducers} from'redux'

export default combineReducers({
	todos,
	loading,
	goals,
})