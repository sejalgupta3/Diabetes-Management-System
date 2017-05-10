import React, { Component } from 'react';

class Medication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicationJson: '{}'
    };
    this.renderMedicationTable = this.renderMedicationTable.bind(this);
    this.serverUrl = "http://35.161.81.114:9000";
  }

  componentWillMount = function() {
    this.getPatientMedication();
  }

  getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  makePostRequest(url,params, callback){
     var request = new Request(url, {
       method: 'POST',
       body: JSON.stringify({
         data: params
       }),
       mode: 'cors',
       redirect: 'follow',
       headers: new Headers({
         'Content-Type': 'application/json'
       })
     });

     fetch(request).then(function(response) {
       return response.json();
     }).then(function(j) {
       callback(j);
     });
   }

  getPatientMedication = function() {
    this.makePostRequest(this.serverUrl+'/doctor/patientMedications', this.getUrlParameter("id") ,function(json){
      this.setState({'medicationJson':json})
    }.bind(this));
  }

  renderMedicationTable = function(){
    var tableRows = [];
    for(var i in this.state.medicationJson) {
      tableRows.push(
        (
        <tr>
          <td>{this.state.medicationJson[i].dosage}</td>
          <td>{this.state.medicationJson[i].name}</td>
          <td>{this.state.medicationJson[i].timing}</td>
        </tr>
      ));
    }
    return(
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Dosage</th>
            <th>Medicine Name</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="col-md-10">
        <this.renderMedicationTable/>
      </div>
    );
  }
}

export default Medication;
