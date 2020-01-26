import React, { Component } from 'react'
import { Container, Divider, Dropdown, Grid, Image, List, Menu, Segment, Input, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { updateSearch } from './actions/search'

class Header extends Component {

	constructor(props) {
		super(props)
		const { query } = this.props.search
		this.state = {
			query,
		}
	}

	render() {
		const { loading } = this.props
		const { query } = this.state
		return (
			<Menu className='app-header' size='huge'>
				<Container fluid>
					{/* <Menu.Item as='a' header onClick={this.handleHomeClicked.bind(this)}>
						<Button className='app-header-home' animated='fade'>
							<Button.Content visible>MN</Button.Content>
							<Button.Content hidden>
								<Icon name='home' />
							</Button.Content>
						</Button>
			        </Menu.Item> */}
					<Menu.Item>
						<form onSubmit={this.handleSearchSubmit.bind(this)}>
							<Input
								icon={query ? (
									<Icon name='close' onClick={this.handleSearchClear.bind(this)} link />
								) : (
									<Icon name='search' onClick={this.handleSearchSubmit.bind(this)} link />
								)}
								transparent
								placeholder='Search accountants...'
								onChange={this.handleSearchChange.bind(this)}
								input={<input value={query} />}
							/>
						</form>
					</Menu.Item>
				</Container>
		    </Menu>
		)
	}

	handleHomeClicked() {
		const { updateSearch } = this.props
		updateSearch({
			query: '',
			location: {},
			selected: [],
		})
	}

	handleSearchClear() {
		const { updateSearch } = this.props
		updateSearch({ query: '' })
	}

	handleSearchSubmit() {
		const { updateSearch } = this.props
		const { query } = this.state
		updateSearch({ query })
	}

	handleSearchChange(event) {
		const query = event.target.value
		this.setState({ query })
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		search: state.search,
		loading: state.results.loading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearch: (params) =>{
			dispatch(updateSearch(params))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
