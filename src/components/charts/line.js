import React, { Component } from 'react';

var ReactHighcharts = require('react-highcharts');
class Line extends Component {
  render(){
    return (
      <ReactHighcharts
        config = {{
          chart: {
              type: 'line'
          },
          title: {
              text: 'Glucose Records'
          },
          xAxis: {
              categories: this.props.categories
          },
          yAxis: {
              title: {
                  text: 'Y-Axis'
              }
          },
          plotOptions: {
              line: {
                  dataLabels: {
                      enabled: true
                  },
                  enableMouseTracking: false
              }
          },
          series: [{
              name: 'Glucose',
              data: this.props.data,
              color: 'red'
          }]
        }}
        ref="chart"/>
    );
  }
}

export default Line;
