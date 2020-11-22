import React, { Component } from 'react';
import axios from 'axios';

class Analysis extends Component {
  componentDidMount() {
    console.log('hi')
    getMarkers();

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

const getMarkers = async () => {
  const data = await axios.get('http://localhost:8000/polygon/all')

  console.log(data)
}

export default Analysis;
