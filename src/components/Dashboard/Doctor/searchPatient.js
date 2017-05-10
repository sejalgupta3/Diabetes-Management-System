import React, { Component } from 'react';

class searchPatient extends Component {
	 constructor(props) {
	 super(props);
	 this.state = {
			 id : 1,
	         test: "",
	         testing: "[]"
	 		};
		this.serverUrl = "http://35.161.81.114:9000";
	 }

	 componentWillMount = function(){
	 	this.getPatientList();
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


	 getPatientList = function() {
		this.makeGetRequest(this.serverUrl+'/doctor/searchPatient', function(json){
			this.setState({'testing':JSON.stringify(json)})
		    }.bind(this));
	 }

	 handleClick = (id) => {
		    var val = document.getElementById("input").value;
		    var arr= val.split(" ");
		    window.location = '/dashboard/patientDetails/' + arr[0] ;
		  }

	render() {
		var rows= [];
		var datalisttable = JSON.parse(this.state.testing);
		for(var i in datalisttable)
		{	var id = datalisttable[i].fname + " " + datalisttable[i].lname
			rows.push(<option value={id}></option>)  ;
		}
    return (
    		 <div className="container">
    	  <div className="jumbotron">
    	    <h1>Search Patient</h1>
    	  </div>
    	<div className="add-Background" >
	    	<input list="browsers" id='input' placeholder="Search Patient.."></input>
	    	<datalist id="browsers">
	    	  {rows}
	    	</datalist>
	    	<button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick}> Enter </button>
    	</div>
    	</div>

    );
  }
}
/*
//DISPLAY BLOCK
class Display extends React.Component {
	render() {
		   var rows=[];
			this.props.tables.forEach(function(person) {
			rows.push(<tr><td>{person.fname}</td><td>{person.lname}</td></tr>)
			});
		   return (
	         <div>
	         <table>
             <thead>
                 <tr>
                     <th>Name</th>
                     <th>Roll No</th>
                 </tr>
             </thead>
             <tbody>{rows}</tbody>
         </table>
	         </div>
	      );
	   }
	}

// CONTENT CLASS
class Content extends React.Component {
	   render() {
		   return (
	         <div>
	            <input type = "text" value = {this.props.myDataProp}
	               onChange = {this.props.updateStateProp} />
	            <h3>{this.props.myDataProp}</h3>
			   </div>
	      );
	   }
	}
*/
export default searchPatient;
