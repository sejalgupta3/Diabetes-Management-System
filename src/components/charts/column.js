import React, { Component } from 'react';

var ReactHighcharts = require('react-highcharts');
class Column extends Component {
  render(){
    return (
      <ReactHighcharts
        config = {{
          chart: {
        type: 'column'
    },
    colors: ['rgba(124, 181, 236, 0.5)'],
    title: {
        text: 'Activity Records'
    },
    xAxis: {
        categories: this.props.categories,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Y-Axis'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 1,
            fillOpacity: 0.8
        }
    },
    series: [{
        name: 'Steps',
        data: this.props.data
    }]
        }}
        ref="chart"/>
    );
  }
}

export default Column;
