import React, { Component } from 'react';
import ApexChart from "../components/Chart";
import firebase from '../firebase';
import ReactApexChart from "react-apexcharts";
class Sensors extends Component {
  constructor(props) {
    super(props);

      this.state = {
        options: {
          chart: {
            id: "co2-bar"
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          }
        },
        temperature: [{
          name: "temp",
          data: []
        }],
        tvoc: [{
          name: "tvoc",
          data: []
        }],
        co2: [{
          name: "co2",
          data: []
        }],
        pressure: [{
          name: "pressure",
          data: []
        }],
      };
  }


  componentDidMount(){
    // console.log();
    const arduinoRef = firebase.database().ref('Arduino Data');
    arduinoRef.limitToLast(1).on('value', querySnapshot => {
      const data = querySnapshot.val();
      const { temperature, tvoc, co2, pressure } = this.state; 
      const newTemp = this.state.temperature;
      for( const [key, value] of Object.entries(data)) {
        // console.log(value);
        newTemp[0].data.push(parseInt(value.temp))
        // temperature[0].data.push(parseInt(value.temp));
        // temperature.slice(Math.max(temperature.length - 5, 0));
        tvoc[0].data.push(parseInt(value.tvoc));
        co2[0].data.push(parseInt(value.c02));
        pressure[0].data.push(parseInt(value.pressure));
      }
      // console.log(tempera/ture);
      this.setState({
        temperature: newTemp, 
        tvoc, 
        co2: co2,
        pressure
      })
      // temperature.push(data.)  
        // console.log(querySnapshot.val());
    })
  }
  render() {
    const { temperature, tvoc, co2, pressure } = this.state;
    console.log("fsfsf")
    
    return (
      <div className = "Sensors">
          <h1 className = "SensorsTitle1">
            Sensor Data
          </h1>
          <div className = "SensorsDataCol">
            <div className = "SensorsDataRow">
              <div className = "CO2 SensorContainer">
                CO2 Studies have shown that higher concentrations of atmospheric carbon dioxide affect crops in two important ways: they boost crop yields by increasing the rate of photosynthesis, which spurs growth, and they reduce the amount of water crops lose through transpiration.
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.co2}
                  type="line"
                  width="300"
                />
              </div>
              <div className = "TVOC SensorContainer">
                TVOC
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.tvoc}
                  type="line"
                  width="300"
                />
              </div>
            </div>
            <div className = "SensorsDataRow">
              <div className = "Pressure SensorContainer">
                Pressure
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.pressure}
                  type="line"
                  width="300"
                />
              </div>
              <div className = "Temp SensorContainer">
                Temp
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.temperature}
                  type="line"
                  width="300"
                />
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Sensors;
