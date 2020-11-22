import React, { Component } from 'react';
import Map from '../components/Map';
class Polygons extends Component {
  render() {
    return (
      <div className = "Polygons">
          <h1 className = "PolygonsTitle1">
            Draw a polygon on the map below to analyze.
          </h1>
          <h2 className = "PolygonsInstructionsTitle">
            Instructions
          </h2>
          <p className = "PolygonsInstructions">
            Click the top button in the top left to create a polygon by clicking on the map. <br></br>
            Click on a created polygon and click on the bottom button in the top left to delete the selected polygon
          </p>
          <Map/>
      </div>
    );
  }
}

export default Polygons;
