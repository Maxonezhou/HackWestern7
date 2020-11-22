import React, { Component } from 'react';

class Sensors extends Component {
  render() {
    return (
      <div className = "Sensors">
          <h1 className = "SensorsTitle1">
            Sensor Data
          </h1>
          <div className = "SensorsData">
            <div className = "CO2">
              CO2
            </div>
            <div className = "TVOC">
              TVOC
            </div>
            <div className = "Pressure">
              Pressure
            </div>
            <div className = "Temp">
              Temp
            </div>
          </div>
      </div>
    );
  }
}

export default Sensors;
