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
          Eric is so hot
      </div>
    );
  }
}

const getMarkers = async () => {
  const data = await axios.get('http://localhost:8000/polygon/all')

  console.log(data)
}

export default Analysis;
