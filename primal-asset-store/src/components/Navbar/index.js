import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
//NavBtn,
//NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<div>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/ui' activeStyle>
			UI
		</NavLink>
		<NavLink to='/game' activeStyle>
			Game
		</NavLink>
		<NavLink to='/about' activeStyle>
			About
		</NavLink>
		<NavLink to='/faq' activeStyle>
			FAQ
		</NavLink>
		</NavMenu>
		<NavLink to='/Login' activeStyle>Login
		</NavLink>
		
	</Nav>
	</div>
	<div>
	<Nav>
    	<Bars />
	<NavLink to='/SearchBar' activeStyle>
			SearchBar
		</NavLink>
	</Nav>
	</div>
	</>
);
};

export default Navbar;
