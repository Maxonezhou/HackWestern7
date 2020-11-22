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
                    <Nav.Link active={this.active("map")} className="Sidebar-link"  href="/map">Add Polygons</Nav.Link>
                    <Nav.Link active={this.active("polygons")} className="Sidebar-link"  href="/polygons">My Polygons</Nav.Link>
                    <Nav.Link active={this.active("sensors")} className="Sidebar-link" href="/sensors">My Sensors</Nav.Link>
                    <Nav.Link active={this.active("analysis")} className="Sidebar-link" href="/analysis">Analysis</Nav.Link>
                </Nav>
            </div>
        );
    }
}

export default Sidebar;