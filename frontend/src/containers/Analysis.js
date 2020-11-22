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
