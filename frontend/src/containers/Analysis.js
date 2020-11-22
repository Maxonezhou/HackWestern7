import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import ReactApexChart from "react-apexcharts";
class Analysis extends Component {
  constructor(props) {
    super(props);

      this.state = {
        ultraviolets: [],
        vegetation: [],
        pressures: [],
        temps: [],
        clouds: [],
        dewpoint: [],
        windSpd: [],
        windDeg: [],
        humidity: [],
        visibility: []

      };
  }

  async componentDidMount() {
    let now = moment().unix()
    const now2 = moment()
    let sixMonthsAgo = moment().subtract(6, 'months').unix()
    
    let ultraVioletData = await getUltraViolet()
    this.setState({
      ultraviolet: ultraVioletData.uvi
    })

    let vegetationsMap = new Map()
    let vegetationData = await getVegetationIndex(sixMonthsAgo, now)
    for(let i = 0; i < vegetationData.length; i++) {
      vegetationsMap.set(moment.unix(vegetationData[i].dt).format("MMMM Do YYYY"), vegetationData[i].data.median)
    }

    this.setState({
      vegetation: [{
          name: "vegetation",
          data: [0.005, 0.134, 0.352, 0.433, 0.211, 0.068]
      }],
      ultraviolets : [{
        name: "ultraviolet",
        data: [0.68, 0.74, 0.67, 0.71, 0.77, 0.73]
      }]
    })

    let weatherData = await getWeather(now)

    const pressure = [];
    const temps = [];
    const clouds = []; 
    const dewpoints = [];
    const visibilities = [];
    const windSpds = [];
    const windDegs = [];
    const humidities = [];
    
    for(let i = 0; i < 6; ++i) {
        pressure.push([0, 0]);
        temps.push([0, 0]);
        clouds.push([0, 0]);
        dewpoints.push([0, 0]);
        visibilities.push([0, 0]);
        humidities.push([0, 0]);
        windSpds.push([0, 0]);
        windDegs.push([0, 0]);
       
    }

    for (let i = 0; i < weatherData.length; i++)
    {
      let wData = weatherData[i];
      for (let j = 0; j < wData.length; j++)
      {
        const currDate = moment.unix(wData[j].dt);
        const days = now2.diff(currDate, "days");    
        pressure[5 - days][0] += wData[j].pressure;
        pressure[5 - days][1]++;
        temps[5 - days][0] += wData[j].temp;
        temps[5 - days][1]++;
        clouds[5 - days][0] += wData[j].clouds;
        clouds[5 - days][1]++;

        dewpoints[5 - days][0] += wData[j].dew_point;
        dewpoints[5 - days][1]++;

        visibilities[5 - days][0] += wData[j].visibility;
        visibilities[5 - days][1]++;

        humidities[5 - days][0] += wData[j].humidity;
        humidities[5 - days][1]++;
  
        windSpds[5 - days][0] += wData[j].wind_speed;
        windSpds[5 - days][1]++;

        windDegs[5 - days][0] += wData[j].wind_deg;
        windDegs[5 - days][1]++;
      }
      
    }  
    
    for(let i = 0; i < 6; ++i) {
        pressure[i][0] /= pressure[i][1];
        pressure[i] = Math.round(pressure[i][0]);
        temps[i][0] /= temps[i][1];
        temps[i] = Math.round(temps[i][0]);
        clouds[i][0] /= clouds[i][1];
        clouds[i] = Math.round(clouds[i][0]);

        dewpoints[i][0] /= dewpoints[i][1];
        dewpoints[i] = Math.round(dewpoints[i][0]);

        visibilities[i][0] /= visibilities[i][1];
        visibilities[i] = Math.round(visibilities[i][0]);

        humidities[i][0] /= humidities[i][1];
        humidities[i] = Math.round(humidities[i][0]);

        windSpds[i][0] /= windSpds[i][1];
        windSpds[i] = Math.round(windSpds[i][0]);

        windDegs[i][0] /= windDegs[i][1];
        windDegs[i] = Math.round(windDegs[i][0]);

    }

    visibilities[1] = 0
    this.setState({
      pressures: [{
          name: "pressure",
          data: pressure
      }],
      temps: [{
          name: "temp",
          data: temps
      }],
      clouds: [{
          name: "clouds",
          data: clouds
      }]
    });
    this.setState({
        dewpoint: [{
            name: "dewpoints",
            data: dewpoints
        }],
        visibility: [{
            name: "visibilities",
            data: visibilities
        }],
        humidity: [{
            name: "humidities",
            data: humidities
        }]
    });
    this.setState({
        windSpd: [{
            name: "windSpds",
            data: windSpds
        }],
        windDeg: [{
            name: "windDegs",
            data: windDegs
        }]
    })
  }

  getOptions = (id) => {
    return {
        chart: {
          id: id
        },
        xaxis: {
          categories: ["Nov 17", "Nov 18", "Nov 19", "Nov 20", "Nov 21", "Nov 22" ]
        }
    }

  }

  // fixed time data
  render() {
    return (
      <div className = "Analysis">
          <h1 className = "AnalysisTitle1"> Data Analysis </h1>
          <div className = "AnalysisCol">
            <div className = "AnalysisRow">
              <div className = "NDVI AnalysisComponent">
                <div className = "AnalysisTitle"> NDVI </div>
                <p className = "AnalysisDesc">
                  The normalized difference vegetation index (NDVI) is a simple graphical indicator that can be used to analyze remote sensing measurements, often from a space platform, assessing whether or not the target being observed contains live green vegetation.
                </p>
                <ReactApexChart
                    options={this.getOptions("vegetation")}
                    series={this.state.vegetation}
                    type="line"
                    width="300"
                  />
              </div>
              <div className = "UV AnalysisComponent">
               <div className = "AnalysisTitle"> UV </div>
               <p className = "AnalysisDesc">
                The ultraviolet index, or UV index, is an international standard measurement of the strength of sunburn-producing ultraviolet radiation at a particular place and time.
               </p>
               <ReactApexChart
                    options={this.getOptions("ultraviolet")}
                    series={this.state.ultraviolets}
                    type="line"
                    width="300"
                  />
              </div>
              <div className = "APITemp AnalysisComponent">
                <div className = "AnalysisTitle"> Temperature </div>
                <p className = "AnalysisDesc">
                  Accumulated temperature is a weather parameter that directly influences the productivity of agricultural plants. All biological and chemical processes taking place in the soil are connected with air temperature.
                </p>
                <ReactApexChart
                    options={this.getOptions("temp")}
                    series={this.state.temps}
                    type="line"
                    width="300"
                  />
              </div>
              <div className = "APIPressure AnalysisComponent">
                <div className = "AnalysisTitle"> Pressure </div>
                <p className = "AnalysisDesc">
                  Monitoring atmospheric pressure changes in your area means that it is easier to take precautions like covering or netting crops in the event of a coming storm
                </p>
                <ReactApexChart
                    options={this.getOptions("pressure")}
                    series={this.state.pressures}
                    type="line"
                    width="300"
                  />
              </div>
              <div className = "Humidity AnalysisComponent">
                <div className = "AnalysisTitle"> Humidity </div>
                <p className = "AnalysisDesc">
                  Humid air directly contributes to problems such as foliar and root diseases, slow drying of the growing medium, plant stress, loss of quality, loss in yields, etc. Therefore more pesticides are needed for disease control and plants tend to have weak, stretched growth making the plant less desirable.
                </p>
                {this.state.humidities}
                <ReactApexChart
                    options={this.getOptions("humidity")}
                    series={this.state.humidity}
                    type="line"
                    width="300"
                  />
              </div>
            </div>
            <div className = "AnalysisRow">
              <div className = "DewPoint AnalysisComponent">
                <div className = "AnalysisTitle"> Dew Point </div>
                <p className = "AnalysisDesc">
                  The percent of relative humidity is important to agriculture. It is such a good air moisture index for biological organisms and processes. Dewpoint temperature, on the other hand, is  an important index of how much water is in the air.
                </p>
                <ReactApexChart
                    options={this.getOptions("dewpoints")}
                    series={this.state.dewpoint}
                    type="line"
                    width="300"
                  />
              </div>
              <div className = "Clouds AnalysisComponent">
                <div className = "AnalysisTitle"> Cloud Coverage </div>
                <p className = "AnalysisDesc">
                  Cloud coverage throughout the agricultural season blocks sunlight which is crucial for photosynthesis.
                </p>
                <ReactApexChart
                    options={this.getOptions("clouds")}
                    series={this.state.clouds}
                    type="line"
                    width="300"
                  />
              </div>
              <div className = "Visibility AnalysisComponent">
                <div className = "AnalysisTitle"> Visibility </div>
                <p className = "AnalysisDesc">
                  Visibility contributes to the blocking of sunlight and is also related to relative humidity in the air.
                </p>
                <ReactApexChart
                    options={this.getOptions("visibilities")}
                    series={this.state.visibility}
                    type="line"
                    width="300"
                  />
              </div>
              <div className = "WindSpeed AnalysisComponent">
                <div className = "AnalysisTitle"> Wind Speed </div>
                <p className = "AnalysisDesc">
                  Wind speed affects the pollenation pattern of crops as well as the spread of pesticides and fertilizer. 
                </p>
                <ReactApexChart
                    options={this.getOptions("windSpds")}
                    series={this.state.windSpd}
                    type="line"
                    width="300"
                  />
              </div>
              <div className = "WindDeg AnalysisComponent">
                <div className = "AnalysisTitle"> Wind Degree </div>
                <p className = "AnalysisDesc">
                  Wind degree affects the pollenation pattern of crops as well as the spread of pesticides and fertilizer. 
                </p>
                <ReactApexChart
                    options={this.getOptions("windDegs")}
                    series={this.state.windDeg}
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

const getUltraViolet = async () => {
  const res = await axios.get('http://localhost:8000/ultraviolet?polygonID=5fba0774714b5216e2e1c25b')

  return res.data
}

const getVegetationIndex = async (past, current) => {
  const res = await axios.get(`http://localhost:8000/vegetation?polygonID=5fba0774714b5216e2e1c25b&start=${past}&end=${current}`)

  return res.data
}

const getWeather = async (start) => {
  const res = await axios.get(`http://localhost:8000/weather?lat=51.212382&lon=-114.048088&start=${start}`)

  return res.data
}

export default Analysis;
