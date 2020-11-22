import React, { Component } from 'react';
import { Link } from "react-router-dom"; 

import image from '../images/home.svg';
import squareimage from '../images/squares.png'
import squareimage2 from '../images/squares2.png'

class Landing extends Component {
  render() {
    return (
      <div className="Home-wrap">
          <div className="Image-wrap">
            <img className="Home-image" src={image} />
            <img className="squareimage" src={squareimage} />
            <img className="squareimage2" src={squareimage2} />
          </div>
          <div className="Home">
            <div className="Text">
              <h1 className="Title1">
                <span className="Welcome">Welcome</span> to Peak <span className = "Perfarmance">Perfarmance </span>
              </h1>
              <h2 className="Title2">
                We use modern technologies to help small-scale farmers grow.
              </h2>
              <div className="Btn-wrap">
                <Link to="/polygons" className="Title-Btn">
                  Let's get started!
                  <i className="fa fa-arrow-right hvr-forward btn-arrow"></i>
                </Link>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Landing;
