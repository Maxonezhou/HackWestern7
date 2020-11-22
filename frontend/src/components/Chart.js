import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends Component {
    constructor(props) {
      super(props);

        this.state = {
            options: {
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
              }
            },
        };
    }

  
    componentDidMount() {

    }
  

    render() {
      let { series } = this.props;
      console.log(series);
      console.log("max")
      return (
        <div className="mixed-chart">
            <ReactApexChart
                // ref="/realtimeChart"
                options={this.state.options}
                series={series}
                type="line"
                width="300"
            />
        </div>
        );
    }
}

export default ApexChart;