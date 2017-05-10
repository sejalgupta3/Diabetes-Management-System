import React, { Component } from 'react';

var ReactHighcharts = require('react-highcharts');
class Area extends Component {
  render(){
    return (
      <ReactHighcharts
        config = {{
          chart: {
               type: 'area',
               spacingBottom: 30
           },
           title: {
                 text: 'Calories Records'
           },
           xAxis: {
               categories: this.props.dates
           },
           yAxis: {
               title: {
                   text: 'Y-Axis'
               },
               labels: {
                   formatter: function () {
                       return this.value;
                   }
               }
           },
           tooltip: {
               formatter: function () {
                   return '<b>' + this.series.name + '</b><br/>' +
                       this.x + ': ' + this.y;
               }
           },
           plotOptions: {
               area: {
                   fillOpacity: 0.5
               }
           },
           credits: {
               enabled: false
           },
           series: [{
               name: 'Calories Intake',
               data: this.props.caloriesIntake
           }, {
               name: 'Calories Burned',
               data: this.props.caloriesBurned
           }]
        }}
        ref="chart"/>
    );
  }
}

export default Area;
