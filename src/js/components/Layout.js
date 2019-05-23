import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//Navigation
import { Selector } from './Selector';

//Pages
import { HomePage } from "../pages/Home";
import { ExportPage } from "../pages/DataExport";
import { MapPage } from '../pages/Map'

//Styling
import styled from 'styled-components'

const StyledNavBar = styled(Navbar)`
	background: #1a2a6c !important;
	color: #f8af1e
`;

const StyledNavBarBrand = styled(Navbar.Brand)`
    //&:hover {
	//background: #1a2a6c !important;
	color: #f8af1e !important;
	//}
`;

const StyledLink = styled(Link)`
	color: white !important;
	&:hover {
		//background: #1a2a6c !important;
		color: #f8af1e !important;
	}
`;

export default class Layout extends React.Component {
	static defaultProps = {
		username: "User"       
	}
	render() {
		return (
			<Router>
				{/*<StyledNav  className="navbar navbar-expand-lg fixed-top is-white is-dark-text bg-light">*/}
				<StyledNavBar collapseOnSelect expand="md" variant="dark" >
				<StyledNavBarBrand>PUENTE</StyledNavBarBrand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link><StyledLink to="/">DASHBOARD</StyledLink></Nav.Link>
							<Nav.Link><StyledLink to="/dataexport">EXPORT MANAGER</StyledLink></Nav.Link>
							<Nav.Link><StyledLink to="/map">MAP</StyledLink></Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</StyledNavBar>
		
				<Route exact path="/" component={HomePage} />
				<Route path="/dataexport" component={ExportPage} />
				<Route path="/map" component={MapPage} />
			</Router>
		);
	}
}