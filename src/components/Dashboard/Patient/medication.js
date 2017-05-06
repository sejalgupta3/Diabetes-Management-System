import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

class Medication extends Component {
  getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  render() {
    return (
      <div className="col-md-10">
        
      </div>
    );
  }
}

export default Medication;
