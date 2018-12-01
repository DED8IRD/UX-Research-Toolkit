// Header.js
import React from 'react'
import {Menu, Button, Dropdown, Icon, Responsive} from 'semantic-ui-react'

const NavBarMobile = ({children, navbarItems, activeItem, handleMenuItemClick}) => {
	return (
		<Menu 
			content='UXTK'
			fixed='top'
		>
			<Menu.Item
				name='brand'
			>
				<span>
					<img src={process.env.PUBLIC_URL + '/favicon.ico'} width='30px' height='30px' />
					<p>UXTK</p>
				</span>
			</Menu.Item>
			<Menu.Item>
				<Dropdown icon='bars'>
					<Dropdown.Menu>
						{navbarItems.map((name) => {
							const normalizedName = name.split(' ').join('-').toLowerCase()
							return (
								<Dropdown.Item key={normalizedName}
									name={normalizedName}
									disabled={activeItem === normalizedName}
									onClick={handleMenuItemClick}
								>
									{name}
								</Dropdown.Item>
							)
						})}
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Item>				
			<Menu.Menu position='right'>		
				<Menu.Item>
		      <Button secondary>Sign in</Button>
				</Menu.Item>
			</Menu.Menu> 
		</Menu>
	)
}

const NavBarDesktop = ({children, navbarItems, activeItem, handleMenuItemClick}) => {
	return (
		<Menu 
			pointing 
			content='UXTK'
			fixed='top'
			size='large'
		>
			<Menu.Item
				name='brand'
			>
				<img src={process.env.PUBLIC_URL + '/favicon.ico'} />
			</Menu.Item>
			<Menu.Item 
				content='UXTK'
			/>					
			{navbarItems.map((name) => {
				const normalizedName = name.split(' ').join('-').toLowerCase()
				return (
					<Menu.Item key={normalizedName}
						name={normalizedName}
						active={activeItem === normalizedName}
						onClick={handleMenuItemClick}
					/>
				)
			})}
      <Menu.Menu position='right'>
      	<Menu.Item>
		      <Button secondary>Sign in</Button>
	      </Menu.Item>
      </Menu.Menu>					
		</Menu>		
	)
}

export default class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activeItem: 'home'
		}
		this.handleMenuItemClick = this.handleMenuItemClick.bind(this)
	
}
	handleMenuItemClick(e, {name}) {
		this.setState({
			activeItem: name
		})
	}

	render() {
		const navbarItems = ['Home', 'Dashboard', 'Create survey']

		return (
			<div>
				<Responsive {...Responsive.onlyMobile}>
					<NavBarMobile 
						navbarItems={navbarItems} 
						activeItem={this.state.activeItem}
						handleMenuItemClick={this.handleMenuItemClick}
					/>
				</Responsive>
				<Responsive minWidth={Responsive.onlyTablet.minWidth}>
					<NavBarDesktop 
						navbarItems={navbarItems} 
						activeItem={this.state.activeItem}
						handleMenuItemClick={this.handleMenuItemClick}
					/>
				</Responsive>
			</div>
		)
	}
}
