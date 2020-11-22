import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class Analysis extends Component {
  constructor(props) {
    super(props);

      this.state = {
        ultraviolet: '',
        vegetations: [],
        pressures: [],
        temps: [],
        clouds: []
      };
  }

  async componentDidMount() {
    let now = moment().unix()
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
      vegetations: vegetationsMap
    })

    let weatherData = await getWeather(now)
    let pressuresMap = new Map()
    let tempsMap = new Map()
    let cloudsMap = new Map()
    
    for (let i = 0; i < weatherData.length; i++)
    {
      let wData = weatherData[i]
      for (let j = 0; j < wData.length; j++)
      {
        // console.log("Patrick: " + moment.unix(wData[j].dt).format("MMMM Do YYYY HH:MM"))
        pressuresMap.set(moment.unix(wData[j].dt).format("MMMM Do YYYY HH:MM"), wData[j].pressure)
        tempsMap.set(moment.unix(wData[j].dt).format("MMMM Do YYYY HH:MM"), wData[j].temp)
        cloudsMap.set(moment.unix(wData[j].dt).format("MMMM Do YYYY HH:MM"), wData[j].clouds)
      }
      
    }    

    this.setState({
      pressures: pressuresMap,
      temps: tempsMap,
      clouds: cloudsMap
    })
  }

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
              </div>
              <div className = "UV AnalysisComponent">
               <div className = "AnalysisTitle"> UV </div>
               <p className = "AnalysisDesc">
                The ultraviolet index, or UV index, is an international standard measurement of the strength of sunburn-producing ultraviolet radiation at a particular place and time.
               </p>
              </div>
              <div className = "APITemp AnalysisComponent">
                <div className = "AnalysisTitle"> Temperature </div>
                <p className = "AnalysisDesc">
                  Accumulated temperature is a weather parameter that directly influences the productivity of agricultural plants. All biological and chemical processes taking place in the soil are connected with air temperature.
                </p>
              </div>
              <div className = "APIPressure AnalysisComponent">
                <div className = "AnalysisTitle"> Pressure </div>
                <p className = "AnalysisDesc">
                  Monitoring atmospheric pressure changes in your area means that it is easier to take precautions like covering or netting crops in the event of a coming storm
                </p>
              </div>
              <div className = "Humidity AnalysisComponent">
                <div className = "AnalysisTitle"> Humidity </div>
                <p className = "AnalysisDesc">
                  Humid air directly contributes to problems such as foliar and root diseases, slow drying of the growing medium, plant stress, loss of quality, loss in yields, etc. Therefore more pesticides are needed for disease control and plants tend to have weak, stretched growth making the plant less desirable.
                </p>
              </div>
            </div>
            <div className = "AnalysisRow">
              <div className = "DewPoint AnalysisComponent">
                <div className = "AnalysisTitle"> Dew Point </div>
                <p className = "AnalysisDesc">
                  The percent of relative humidity is important to agriculture. It is such a good air moisture index for biological organisms and processes. Dewpoint temperature, on the other hand, is  an important index of how much water is in the air.
                </p>
              </div>
              <div className = "Clouds AnalysisComponent">
                <div className = "AnalysisTitle"> Cloud Coverage </div>
                <p className = "AnalysisDesc">
                  Cloud coverage throughout the agricultural season blocks sunlight which is crucial for photosynthesis.
                </p>
              </div>
              <div className = "Visibility AnalysisComponent">
                <div className = "AnalysisTitle"> Visibility </div>
                <p className = "AnalysisDesc">
                  Visibility contributes to the blocking of sunlight and is also related to relative humidity in the air.
                </p>
              </div>
              <div className = "WindSpeed AnalysisComponent">
                <div className = "AnalysisTitle"> Wind Speed </div>
                <p className = "AnalysisDesc">
                  Wind speed affects the pollenation pattern of crops as well as the spread of pesticides and fertilizer. 
                </p>
              </div>
              <div className = "WindDeg AnalysisComponent">
                <div className = "AnalysisTitle"> Wind Degree </div>
                <p className = "AnalysisDesc">
                  Wind degree affects the pollenation pattern of crops as well as the spread of pesticides and fertilizer. 
                </p>
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
