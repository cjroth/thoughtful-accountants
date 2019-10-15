import React, { Component } from 'react'
import { Item, Dimmer, Loader, Card, Icon, Label, List, Breadcrumb } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { toggleSearchTag, updateSearch } from './actions/search'
import Location from './Location'

class Results extends Component {

	render() {
		const { results, filters } = this.props // state
		const { toggleSearchTag, updateSearchLocation } = this.props // dispatch
		return <div className='results'>
			{results.loading ? (
				<Dimmer active inverted>
					<Loader inverted size='massive' />
				</Dimmer>
			) : (
				<Item.Group>
					{results.results.map((result, index) => {
						return (
							<Card className='results-result' key={index} fluid>
								<Card.Content>
									<Card.Header>
										{result.name}
									</Card.Header>
									{result.locations[0] ? (
										<Card.Header>
											<Label className='result-location'>
												<Location location={result.locations[0]} onSelect={updateSearchLocation} />
											</Label>
										</Card.Header>
									) : null}
									<Card.Meta>
										<Label.Group>
											{result.tags.map((tag, index) => (
												<Label
													as='a'
													key={index}
													color={filters.includes(tag.slug) ? 'yellow' : null}
													onClick={toggleSearchTag.bind(null, tag.slug)}
												>
													{tag.name}
												</Label>
											))}
										</Label.Group>
									</Card.Meta>
									{/* <Card.Description>
										Someday I'll add descriptions...
									</Card.Description> */}
								</Card.Content>
								{result.phone_numbers.length ? (
									<Card.Content extra>
										<List horizontal size='tiny'>
											{result.phone_numbers.map(({ phone_number, type }, index) => (
												<List.Item key={index}>
												  <List.Content>
													<List.Header>{phone_number}</List.Header>
													{{
														M: 'Mobile',
														O: 'Office',
														F: 'Fax',
													}[type]}
												  </List.Content>
												</List.Item>
											))}
										</List>
									</Card.Content>
								) : null}
							</Card>
						)
					})}
				</Item.Group>
			)}
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		search: state.search,
		results: state.results,
		filters: state.search.selected,
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

export default connect(mapStateToProps, mapDispatchToProps)(Results)
