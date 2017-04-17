import React, { Component } from 'react';

class searchPatient extends Component {
	 constructor(props) {
	 super(props);
	 this.state = {
			 id : 1,
	         test: "",
	         testing: "[]"
	 		};
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
		this.makeGetRequest('http://localhost:9000/doctor/searchPatient', function(json){
			 console.log(JSON.stringify(json));
			this.setState({'testing':JSON.stringify(json)})
		    }.bind(this));
	 }	
	 
	 handleClick = (id) => {
		   
		    var val = document.getElementById("input").value;
		    console.log('this is:', this + id );
		    window.location = '/dashboard/patientDetails/' + val ;
		  }
	 
	render() {
		var rows= [];
		var datalisttable = JSON.parse(this.state.testing);
		console.log("Data is cominggg" + datalisttable);
		for(var i in datalisttable)
		{	var id = datalisttable[i].fname 
			rows.push(<option value={id}></option>)  ;
			console.log(id);
		}
    return (
    	<div>	
    	  <div className="jumbotron">
    	    <h1>Search Patient</h1> 
    	  </div>
    	<div className="add-Background" >
	    	<input list="browsers" onInput={this.handleClick} id='input' placeholder="Search Patient.."></input>
	    	<datalist id="browsers">
	    	  {rows}
	    	</datalist>
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
