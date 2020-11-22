import React, { Component } from "react";
import Sidebar from '../components/Sidebar';

class Layout extends Component {
    render() {
        return (
            <div className="Layout">
                <Sidebar/>
                {this.props.childComponent}
            </div>
        );
    }
}

export default Layout;