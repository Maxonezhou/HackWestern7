import React, { Component } from "react";
import { Nav } from "react-bootstrap";

import logo from '../images/logo.svg';

class Sidebar extends Component {
    active = (pathName) => {
        return window.location.pathname.indexOf(pathName) !== -1 ? "active" : "";
    }

    render() {
        return (
            <div className="Sidebar">
                <Nav className="Sidebar-Tabs flex-column">
                    <img className="logo" src={logo} />
                    <Nav.Link className="Sidebar-link"  href="/">Home</Nav.Link>
                    <Nav.Link active={this.active("map")} className="Sidebar-link"  href="/map">Create Polygons</Nav.Link>
                    <Nav.Link active={this.active("sensors")} className="Sidebar-link" href="/sensors">Hardware Sensors</Nav.Link>
                    <Nav.Link active={this.active("analysis")} className="Sidebar-link" href="/analysis">Data Analysis</Nav.Link>
                </Nav>
            </div>
        );
    }
}

export default Sidebar;