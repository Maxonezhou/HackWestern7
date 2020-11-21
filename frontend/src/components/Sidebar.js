import React, { Component } from "react";
import { Nav } from "react-bootstrap";

class Sidebar extends Component {
    render() {
        return (
            <div className="Sidebar">
                <Nav className="flex-column">
                    <Nav.Link className="Sidebar-item" href="/polygons">My Polygons</Nav.Link>
                    <Nav.Link className="Sidebar-item" href="/sensors">My Sensors</Nav.Link>
                    <Nav.Link className="Sidebar-item" href="/analysis">Recommendations</Nav.Link>
                </Nav>
            </div>
        );
    }
}

export default Sidebar;