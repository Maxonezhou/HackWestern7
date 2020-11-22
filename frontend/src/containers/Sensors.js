import React, { Component } from 'react';
import ApexChart from "../components/Chart";
import firebase from '../firebase';
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
class Sensors extends Component {
  constructor(props) {
    super(props);

      this.state = {
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
    const arduinoRef = firebase.database().ref('Arduino Data');
    arduinoRef.limitToLast(1).on('value', querySnapshot => {
      const data = querySnapshot.val();
      const { temperature, tvoc, co2, pressure } = this.state; 
      for( const [key, value] of Object.entries(data)) {
        const length = temperature[0].data.length;
        temperature[0].data.push(parseInt(value.temp));
        tvoc[0].data.push(parseInt(value.tvoc));
        co2[0].data.push(parseInt(value.c02));
        pressure[0].data.push(parseInt(value.pressure));
        if (length == 10) {
          temperature[0].data.shift();
          co2[0].data.shift();
          tvoc[0].data.shift();
          pressure[0].data.shift();
        }
      }
      this.setState({
        temperature, 
        tvoc, 
        co2,
        pressure
      })
      ApexCharts.exec('temp', 'updateSeries', temperature);
      ApexCharts.exec('tvoc', 'updateSeries', tvoc);
      ApexCharts.exec('co2', 'updateSeries', co2);
      ApexCharts.exec('pressure', 'updateSeries', pressure);
    })
  }

  getOptions = (id) => {
    return {
      chart: {
        id: id,
        height: 350,
        type: 'line',
        colors: ['#546E7A', ''],
        xaxis: {
          labels: {
            show: false
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: ['green']
            }
          }
        },
        legend: {
          show: false
        }
      },
    }
  }
  render() {
    const { temperature, tvoc, co2, pressure } = this.state;

    return (
      <div className = "Sensors">
          <h1 className = "SensorsTitle1">
            Sensor Data
          </h1>
          <div className = "SensorsDataCol">
            <div className = "SensorsDataRow">
              <div className = "CO2 SensorContainer">
                <div className = "SensorTitle"> CO2 </div>
                <p className = "SensorDesc">
                  Studies have shown that higher concentrations of atmospheric carbon dioxide affect crops in two important ways: they boost crop yields by increasing the rate of photosynthesis, which spurs growth, and they reduce the amount of water crops lose through transpiration.
                </p>  
                <div className = "SensorFlex">
                  <ReactApexChart
                    options={this.getOptions("co2")}
                    series={co2}
                    type="line"
                    width="300"
                  />
                  <div className = "SensorVal"> {co2[0].data.slice(-1)[0]} ppm </div>
                </div>
              </div>
              <div className = "TVOC SensorContainer">
                <div className = "SensorTitle"> TVOC </div>
                <p className = "SensorDesc">
                  By mediating competition between plant species, VOCs may allow to control weeds and thus enhance crop productivity through a more efficient acquisition of nutrients, water, and light. 
                </p>
                <div className = "SensorFlex">
                  <ReactApexChart
                    options={this.getOptions("tvoc")}
                    series={tvoc}
                    type="line"
                    width="300"
                  />
                  <div className = "SensorVal"> {tvoc[0].data.slice(-1)[0]} ppm</div>
                </div>
              </div>
            </div>
            <div className = "SensorsDataRow">
              <div className = "Pressure SensorContainer">
                <div className = "SensorTitle"> Pressure </div>
                <p className = "SensorDesc">
                  Atmospheric pressure directly affects precipitation levels, oxygen levels for crop respiration, wind pattern for the transportation of pollen, heating/cooling cycles of the atmosphere, and carbon dioxide levels needed to build biomass for photosynthesis.
                </p>
                <div className = "SensorFlex">
                  <ReactApexChart
                    options={this.getOptions("pressure")}
                    series={pressure}
                    type="line"
                    width="300"
                  />
                  <div className = "SensorVal"> {pressure[0].data.slice(-1)[0]} Inches of Hg </div>
                </div>
              </div>
              <div className = "Temp SensorContainer">
                <div className = "SensorTitle"> Temperature </div>
                <p className = "SensorDesc">
                  Climate change can disrupt food availability, reduce access to food, and affect food quality. For example, projected increases in temperatures, changes in precipitation patterns, changes in extreme weather events, and reductions in water availability may all result in reduced agricultural productivity.
                </p>
                <div className = "SensorFlex">
                  <ReactApexChart
                    options={this.getOptions("temp")}
                    series={temperature}
                    type="line"
                    width="300"
                  />
                  <div className = "SensorVal"> {temperature[0].data.slice(-1)[0]} °C</div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Sensors;
