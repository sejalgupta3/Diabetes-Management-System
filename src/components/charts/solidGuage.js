import React, { Component } from 'react';
import solidgauge from 'highcharts/modules/solid-gauge.src';

var ReactHighcharts = require('react-highcharts');
var HighchartsMore = require('highcharts-more');
var SolidGauge = require("highcharts-solid-gauge");

HighchartsMore(ReactHighcharts.Highcharts);
SolidGauge(ReactHighcharts.Highcharts);

class SolidGuage extends Component {
  render(){
    return (
      <ReactHighcharts
        config = {{
          chart: {
            type: 'solidgauge',
            borderWidth: 0,
            height: '200px'
          },
          title: 'null',
          pane: {
            center: ['50%', '80%'],
            size: '130%',
            startAngle: -90,
            endAngle: 90,
            background: {
              backgroundColor: '#EEE',
              innerRadius: '60%',
              outerRadius: '100%',
              shape: 'arc'
            }
          },
          tooltip: {
            enabled: false
          },
          yAxis: {
            stops: [
              [0.3, 'red'],
              [0.7, 'yellow'],
              [1, 'green']
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
              text: parseInt(this.props.goal - this.props.data) + ' more ' +this.props.text,
              y: 100
            },
            labels: {
              y: 16
            },
            min: 0,
            max: 100
          },
          plotOptions: {
            solidgauge: {
              dataLabels: {
                y: 50000,
                borderWidth: 0,
                useHTML: true
              }
            }
          },
          credits: {
            enabled: false
          },
          series: [{
            name: this.props.text,
            data: [(this.props.data/this.props.goal)*100]
          }]
        }}
        ref="chart"/>
    );
  }
}

export default SolidGuage;
