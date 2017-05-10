import React, { Component } from 'react';

class patientMedications extends Component {
	constructor(props) {
		 super(props);
		 this.state = {
		         id:this.props.match.params.id,
				 medications: "[]",
		         items: [],
		 		};

		 this.addToPatientList = this.addToPatientList.bind(this);
		 this.addMedication = this.addMedication.bind(this);
		 this.removeMedication = this.removeMedication.bind(this);
		 this.getPatientMedication = this.getPatientMedication.bind(this);
		 this.serverUrl = "http://35.161.81.114:9000";
		 }

	componentWillMount = function(){
	 	this.getMedicationsList();
	 	this.getPatientMedication(this.state.id);
	}

	 makeGetRequest(url, callback){
		    var request = new Request(url, {
		    	method: 'GET',
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

	 addMedication = function(name) {
		 this.makePostRequest(this.serverUrl+'/doctor/addMedication', name ,function(json){
			 var data =  JSON.stringify(json);
		    }.bind(this));
	}
	 getMedicationsList = function() {
		this.makeGetRequest(this.serverUrl+'/doctor/medicationsList', function(json){
			this.setState({'medications':JSON.stringify(json)})
		    }.bind(this));
	 }
	 getPatientMedication = function(id) {
	 this.makePostRequest(this.serverUrl+'/doctor/patientMedications', id ,function(json){
			 var newArr = this.state.items.concat(json);
		 this.setState({'items':newArr})
		    }.bind(this));
	}
	 getRemoveMedication = function(obj) {
		 this.makePostRequest(this.serverUrl+'/doctor/removeMedications', obj ,function(json){
			 var newArr = this.state.items.concat(json);
	     	 this.setState({'items':json})
		//	 this.getPatientMedication(this.state.id);
		    }.bind(this));
	}
	 addToPatientList = function() {
		    var val1 = document.getElementById("ml").value;
		    var val2 = document.getElementById("Dosage").value;
		    var val3 = document.getElementById("timing").value;

		    if(val1=="" || val2=="" || val3 ==""){
		    	alert("Empty field are not allowed!");} else {
		    var newItem = {
				      name: val1,
				      dosage :val2,
				      timing :val3
				    };

				    var newArr = this.state.items.concat(newItem);

				  	this.setState({
				    	items: newArr,
				    },function afterStateChange(){
				    	var obj = {
				    			pat_id : this.state.id,
				    			items : this.state.items
				    	}
				    	this.addMedication(obj)})
			 document.getElementById("ml").value= "";
			 document.getElementById("Dosage").value="";
			 document.getElementById("timing").value="";
		    }
	 }

	 removeMedication = function(medicine){
		 var obj = {
	    			id : this.state.id,
	    			items : medicine
	    	}
		 this.getRemoveMedication(obj);
	 }


  render() {
	  var rows= [];
		var datalisttable = JSON.parse(this.state.medications);
		for(var i in datalisttable)
		{	var id = datalisttable[i].MedicationName;
			rows.push(<option value={id}></option>)  ;
		}
		const data = this.state.items.map((item) => {
	    	return <tr><td>{item.name}</td><td>{item.dosage}</td><td>{item.timing}</td><td><button className="btn btn-danger" onClick = {() => this.removeMedication(item)} > Remove</button></td></tr>
	    });

    return (
	<div className="container" >
		<div className="jumbotron">
	    	<h1>Patient Medication List</h1>
	    </div>
		   <div className="row demo-content">
				<div className="col-md-12 margins-ib">
					<div className="form-inline">
						<div className="form-group">
								<label for="usrid">Patient ID</label>
								<input type="text" className="form-control" id="usrid" value = {this.state.id}/>
						</div>
						<div className="form-group padding-ib right">
								<label for="mn"> Rendering Physician</label>
								<input type="text" className="form-control" id="mn" value="Dr Jones Scizon"/>
						</div>
					</div>
				</div>
				<div className="form-inline padding-left">
					<div className="form-group padding-ib ">
						<label for="med">Medication:</label>
						<input list="browsers"  id='ml' placeholder="Search Medication.."></input>
			  	    	<datalist id="browsers">
			  	    	  {rows}
			  	    	</datalist>
					</div>
					<div className="form-group padding-ib">
						<label for="DStime">Dosage:</label>
						<input list="DStime" id ="Dosage" placeholder="Select Dosage.." name="Dosage Timings"/>
					 	<datalist id="DStime">
					    	<option value="One tablet"/>
					    	<option value="Two tablet"/>
					    	<option value="Three tablet"/>
					    	<option value="One Teaspoon"/>
					    	<option value="10 mL, 2 drops"/>
					    	<option value="One injection"/>
					    	<option value="2 Puff"/>
					    </datalist>
					</div>
					<div className="form-group padding-ib">
						<label for="time">Timings:</label>
						<input list="time" id = "timing" name="Frequency" placeholder="Select Frequency.."/>
					 	<datalist id="time">
					    	<option value="Once a day"/>
					    	<option value="Twice a Day"/>
					    	<option value="Thrice a Day "/>
					    	<option value="Daily"/>
					    	<option value="Weekly"/>
					    	<option value="Monthly"/>
					  </datalist>
					</div>
					<button className="btn btn-success" onClick = {this.addToPatientList} > Add</button>
				</div>
		</div>
		<br></br> <br></br>
		<div className="demo-content padding-left">
		<table className="table">
				<thead className="thead-inverse">
				<tr>
				  <th>Medication</th>
				  <th>Dosage</th>
				  <th>Timings</th>
				</tr>
				</thead>
				<tbody>
					{data}
				</tbody>
		</table>
		</div>
	</div>
    );
  }
}



export default patientMedications;
