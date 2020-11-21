import React, { Component } from "react";
import { Nav } from "react-bootstrap";

class Sidebar extends Component {
    render() {
        return (
            <div className="Sidebar">
                <Nav className="flex-column">
                    <Nav.Link href="/polygons">My Polygons</Nav.Link>
                    <Nav.Link href="/sensors">My Sensors</Nav.Link>
                    <Nav.Link href="/analysis">Recommendations</Nav.Link>
                </Nav>
            </div>
        );
    }
}

export default Sidebar;