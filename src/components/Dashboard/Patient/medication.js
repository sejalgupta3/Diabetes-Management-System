import React, { Component } from 'react';

class Medication extends Component {
  render() {
    return (
      <div className="col-md-10">
        <div className="row widget-items">
          <table class="table table-hover">
            <tr>
              <th>Time</th>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default Medication;
