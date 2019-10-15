import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import Header from './Header'
import Results from './Results'
import Search from './Search'
import { search } from './actions/search'

class App extends Component {

	componentDidUpdate() {
		const { dispatch } = this.props
		this.reset++
		dispatch(search())
	}

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(search())
		this.reset = 0
	}

	render() {
		// key={this.reset} will force the app to recreate all children components every time it rerenders, which will
		// effectively clear all of the children components' state.
		return <div className='app' key={this.reset}>
			<Header />
			<div className='main'>
				<Results />
				<Search />
			</div>
		</div>
	}

}

const mapStateToProps = (state, ownProps) => {
	return state.search
}

export default connect(mapStateToProps)(App)
