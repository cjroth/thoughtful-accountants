import React, { Component } from 'react'
import { Button, Dimmer, Loader, Popup, Input, Icon, Container, List, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { toggleSearchTag, updateSearch } from './actions/search'
import Location from './Location'

class Search extends Component {

	constructor(props) {
		super(props)
		this.state = {
			expanded: false,
			query: '',
		}
	}

	handleTagSearchChange(event) {
		const value = event.target.value
		this.setState({
			query: value,
		})
	}

	handleTagSelect(tag) {
		const { toggleSearchTag } = this.props
		toggleSearchTag.call(null, tag.slug)
		this.setState({
			query: '',
		})
	}

	handleTagSearchClear() {
		this.setState({
			query: '',
		})
	}

	toggleExpand() {
		this.setState({ expanded: !this.state.expanded })
	}

	filterTagsByQuery() {
		const { tags } = this.props.tags
		const { query } = this.state
		const { selected } = this.props.search
		return tags

			// Don't include currently selected tags
			.filter(tag => !selected.includes(tag.slug))

			// Filter tags by name and description with the query
			.filter(tag => tag.name.toLowerCase().includes(query.toLowerCase()) || (tag.description || '').toLowerCase().includes(query.toLowerCase()))
	}

	isLocationSelected() {
		const { location } = this.props.search
		return location.city || location.state
	}

	render() {
		const { selected, location } = this.props.search
		const { tags, loading } = this.props.tags
		const { toggleSearchTag, updateSearchLocation } = this.props
		const { expanded, query } = this.state
		const isLocationSelected = this.isLocationSelected.call(this)
		return (
			loading ? (
				<Dimmer className='search' active inverted>
					<Loader inverted size='massive' />
				</Dimmer>
			) : (
				<div className={`search ${expanded ? 'search-expanded' : ''}`}>
					<Container key='header' fluid className={`search-section search-header ${isLocationSelected || selected.length ? 'has-results' : ''}`}>
						<Icon name={`chevron ${expanded ? 'down' : 'right'}`} className='search-expand' onClick={this.toggleExpand.bind(this)} />
						{isLocationSelected || selected.length ? (
							<div>
								{location ? (
									<Location size='mini' location={location} onSelect={updateSearchLocation} wrapper={(
										<Label className='search-filters' />
									)} />
								) : null}
								{selected.length ? (
									<Label className='search-filters' onClick={this.toggleExpand.bind(this)}>
										<Icon name='filter' /> {selected.length} Filter{selected.length !== 1 ? 's' : ''}
									</Label>
								) : null}
							</div>
						) : (
							<Label className='search-filters' onClick={this.toggleExpand.bind(this)}>
								Click to add a filter
							</Label>
						)}

					</Container>
					{selected.length ? (
						<Container fluid className='search-section search-tags'>
							{tags.filter(tag => selected.includes(tag.slug)).map((tag, index) => {
								const button = (
									<Button
										basic
										size='mini'
										animated='fade'
										className='tag'
										key={index}
										onClick={toggleSearchTag.bind(null, tag.slug)}
									>
										<Button.Content visible>{tag.name}</Button.Content>
										<Button.Content hidden>
											<Icon name='close' />
										</Button.Content>
									</Button>
								)
								return tag.description ? (
									<Popup key={index} trigger={button} content={tag.description} key={index} />
								) : button
							})}
						</Container>
					) : null}
					<Container fluid className='search-section tag-search'>
						<Input
							fluid
							loading={loading}
							icon={query ? <Icon name='close' onClick={this.handleTagSearchClear.bind(this)} link /> : null}
							placeholder='Filter search by tag...'
							value={query}
							onChange={this.handleTagSearchChange.bind(this)}
						/>
					</Container>
					<List divided relaxed className='tag-results'>
						{this.filterTagsByQuery.call(this).map((tag, index) => {
							const item = <List.Item as='a' key={index} onClick={this.handleTagSelect.bind(this, tag)}>{tag.name}</List.Item>
							return tag.description ? (
									<Popup key={index} position='left center' content={tag.description} trigger={item} key={index} />
								) : item
						})}
					</List>
				</div>
			)
		)
	}

}

const mapStateToProps = (state, ownProps) => {
	return {
		search: state.search,
		tags: state.tags,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleSearchTag: (slug) => {
			dispatch(toggleSearchTag(slug))
		},
		updateSearchLocation: (location) => {
			dispatch(updateSearch({ location }))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
