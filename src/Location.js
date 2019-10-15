import React, { PureComponent } from 'react'
import { Breadcrumb, Flag, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'


class Location extends PureComponent {

	render() {
		const { location, showCountry, onSelect, size, selected, wrapper } = this.props
		if (!location) {
			return null
		}
		const { country, state, city } = location
		const components = []
		if (showCountry && country) {
			components.push(
				<Breadcrumb.Section link className={selected.country ? 'active' : ''} onClick={onSelect.bind(null, { country })}>
					<Flag name={country.toLowerCase()} />
				</Breadcrumb.Section>
			)
		}
		if (city) {
			components.push(
				<Breadcrumb.Section link className={selected.city ? 'active' : ''} onClick={onSelect.bind(null, { country, state, city })}>
					{city}
				</Breadcrumb.Section>
			)
		}
		if (state) {
			components.push(
				<Breadcrumb.Section link className={selected.state ? 'active' : ''} onClick={onSelect.bind(null, { country, state })}>
					{state}
				</Breadcrumb.Section>
			)
		}
		if (components.length === 0) {
			return null
		}
		const divider = (
			<Breadcrumb.Divider content=',' />
		)
		const parts = components.reduce((list, component, index) => {
			return index ? list.concat(divider, component) : list.concat(component)
		}, [])
		const component = (
			<Breadcrumb size={size} className='results-location'>
				<Icon name='point' />
				{parts.map((component, index) => React.cloneElement(component, { key: index }))}
			</Breadcrumb>
		)
        return wrapper ? React.cloneElement(wrapper, { children: component }) : component
	}
}


const mapStateToProps = (state, ownProps) => {
	return {
		selected: state.search.location,
	}
}

export default connect(mapStateToProps)(Location)
