import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from "../actions/shared";
import ConnectedTodos from './Todo';
import ConnectedGoals from './Goals'

class App extends React.Component {
	componentDidMount () {
		const {dispatch} = this.props
		
		dispatch(handleInitialData())
	}
	
	render () {
		const {loading} = this.props
		
		if (loading === true) {
			return <h3>Loading</h3>
		}
		
		return (
			<div>
				<ConnectedTodos/>
				<ConnectedGoals/>
			</div>
		)
	}
}

export default connect((state) => ({
	loading: state.loading
}))(App);