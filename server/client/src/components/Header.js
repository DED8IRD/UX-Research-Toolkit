// Header.js
import React from 'react'
import {Link} from 'react-router-dom'
import {Menu, Button, Dropdown, Icon, Responsive} from 'semantic-ui-react'

const NavBarMobile = ({children, activeItem, handleMenuItemClick}) => {
	return (
		<Menu 
			content='UXTK'
			fixed='top'
		>
			<Menu.Item as={Link} to='/'
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
					 	<Dropdown.Item as={Link} to='/'
							name='home'
							content='Home'
							disabled={activeItem === 'home'}
							onClick={handleMenuItemClick}
						/>
					 	<Dropdown.Item as={Link} to='/surveys'
							name='dashboard'
							content='Dashboard'
							disabled={activeItem === 'dashboard'}
							onClick={handleMenuItemClick}
						/>
					 	<Dropdown.Item as={Link} to='/surveys/new'
							name='create-new-survey'
							content='Create New Survey'
							disabled={activeItem === 'create-new-survey'}
							onClick={handleMenuItemClick}
						/>
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

const NavBarDesktop = ({children, activeItem, handleMenuItemClick}) => {
	return (
		<Menu 
			pointing 
			content='UXTK'
			fixed='top'
			size='large'
		>
			<Menu.Item as={Link} to='/'
				name='brand'
			>
				<img src={process.env.PUBLIC_URL + '/favicon.ico'} />
			</Menu.Item>
			<Menu.Item 
				content='UXTK'
			/>					
			<Menu.Item as={Link} to='/'
				name='home'
				active={activeItem === 'home'}
				onClick={handleMenuItemClick}
			/>
			<Menu.Item as={Link} to='/surveys'
				name='dashboard'
				active={activeItem === 'dashboard'}
				onClick={handleMenuItemClick}
			/>
			<Menu.Item as={Link} to='/surveys/new'
				name='create-new-survey'
				active={activeItem === 'create-new-survey'}
				onClick={handleMenuItemClick}
			/>
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
		return (
			<div>
				<Responsive {...Responsive.onlyMobile}>
					<NavBarMobile 
						activeItem={this.state.activeItem}
						handleMenuItemClick={this.handleMenuItemClick}
					/>
				</Responsive>
				<Responsive minWidth={Responsive.onlyTablet.minWidth}>
					<NavBarDesktop 
						activeItem={this.state.activeItem}
						handleMenuItemClick={this.handleMenuItemClick}
					/>
				</Responsive>
			</div>
		)
	}
}
