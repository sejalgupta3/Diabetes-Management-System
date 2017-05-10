import React, { Component } from 'react';

class PatientDemographics extends Component {
	constructor(props) {
		 super(props);
		 this.state = {
		         test: "",
		         testing: "[]",
		         patientId:"",
		         firstname:"",
		         mname:"",
		         lastname:"",
		         email:"",
		         ssn:"",
		         age:"",
		         employer:"",
		         maritalstatus:"",
		         homephone:"",
		         workphone:"",
		         mobile:"",
		         city:"",
		         state:"",
		         zipcode:"",
		         address:"",
		         mrn:"",
		         provider:"",
		         referprovider:""
		 		};
				this.serverUrl = "http://35.161.81.114:9000";
		 }

		 componentWillMount = function(){
			 var name =  this.props.match.params.name;
		 	 this.getPatientList(name);
		}

		 showMedications = () => {

			    window.location = '/dashboard/patientMedications/' + this.state.patientId ;
			  }

		 showStatus = () => {
			 window.location = '/dashboard/?user=patient&id=' + this.state.patientId + "#/home" ;

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

		 getPatientList = function(name) {
			this.makePostRequest(this.serverUrl+'/doctor/searchPatientById', name ,function(json){
				 var data =  JSON.stringify(json);
				this.setState({'firstname':json.fname})
				this.setState({'lastname':json.lname})
				this.setState({'mname':json.mname})
				this.setState({'patientId':json.id})
				this.setState({'age':json.age})
				this.setState({'ssn':json.ssn})
				this.setState({'email':json.email})
				this.setState({'mname':json.mname})
				this.setState({'employer':json.employer})
				this.setState({'maritalstatus':json.maritalStatues})
				this.setState({'homephone':json.homephone})
				this.setState({'workphone':json.workphone})
				this.setState({'mobile':json.mobile})
				this.setState({'city':json.city})
				this.setState({'state':json.state})
				this.setState({'zipcode':json.zipcode})
				this.setState({'address':json.address})
				this.setState({'mrn':json.mrn})
				this.setState({'provider':json.provider})
				this.setState({'referprovider':json.ReferringProvider})
			    }.bind(this));
		 }

render() {
    return (

    		 <div className="container">
    		<div className="jumbotron">
    	    <h1>Patient Demographics</h1>
    	  </div>

            <div className="row demo-content">

                <div className="col-md-12 margins-ib">
    				<div className="form-inline">
    					<div className="form-group">
      						<label for="fn">First Name:</label>
      						<input type="text" className="form-control" id="fn" value=	{this.state.firstname}/>
    					</div>
    					<div className="form-group padding-ib">
      						<label for="mn">Middle Name:</label>
      						<input type="text" className="form-control" id="mn" value=	{this.state.mname}/>
    					</div>
    					<div className="form-group padding-ib">
      						<label for="ln">Last Name:</label>
      						<input type="text" className="form-control" id="ln" value=	{this.state.lastname}/>
    					</div>
    				</div>
    			</div>
    			<div className="form-inline">
    				<div className="form-group padding-ib">
    					<label for="gender">Gender:</label>
      					<label className="radio-inline"><input type="radio" name="optradio" checked="checked"/> Male</label>
    					<label className="radio-inline"><input type="radio" name="optradio"/> Female</label>
    					<label className="radio-inline"><input type="radio" name="optradio"/> Other</label>
    				</div>
    				<div className="form-group ">
						<label for="dob">D.O.B:</label>
						<input type="text" className="form-control" id="dob" value="05/07/1978"/>
					</div>
						<div className="form-group padding-ib">
  						<label for="age">Age:</label>
  						<input type="number" className="form-control" id="age" value={this.state.age} />
					</div>
    			</div>


    			<div className="col-md-6">
    				<div className="form-inline">
    					<button type="button" className="btn btn-primary" onClick={this.showMedications}>View Medications</button>
                   </div>
    			</div>
    			<div className="col-md-6">
					<div className="form-inline">
						<button type="button" className="btn btn-warning" onClick={this.showStatus}>View Patient Status</button>
					</div>
				</div>
           	</div>

      		<div className="form-inline col-md-5 demo-content2">
      			<div className="form-inline padding-ib">
      				<label for="ssn">SSN:</label>
      				<input type="number" className="form-control" id="ssn" value={this.state.ssn}/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="add1">Address1:</label>
      				<input type="text" className="form-control" width="" id="add1" value={this.state.address}/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="add2">Address2:</label>
      				<input type="text" className="form-control" id="add2"/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="city">City:</label>
      				<input type="text" className="form-control" id="city" value={this.state.city}/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="state">State:</label>
      				<input type="text" className="form-control" id="State" value={this.state.state}/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="zip">Zipcode:</label>
      				<input type="number" className="form-control" maxlength="5" id="zip" value={this.state.zipcode}/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="hometel">HomePhone:</label>
      				<input type="tel" className="form-control" id="hometel" value={this.state.homephone}/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="worktel">WorkPhone:</label>
      				<input type="tel" className="form-control" id="worktel" value={this.state.workphone}/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="mobile">Mobile:</label>
      				<input type="tel" className="form-control" id="mobile" value={this.state.mobile}/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="email">Email:</label>
      				<input type="email" className="form-control" id="email" value={this.state.email} />
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="dl">Driver Lic:</label>
      				<input type="text" className="form-control" id="dl" value="438578238a2138n"/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="mrn">Medical Rec. No.:</label>
      				<input type="number" className="form-control" id="mrn" value={this.state.mrn}/>
      			</div>
      		</div>
      		<div className="form-inline col-md-5 demo-content2">
      			<div className="form-inline padding-ib">
      				<label for="marital">Marital Status:</label>
      				<input type="text" className="form-control" id="marital" value={this.state.maritalstatus}/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="provider">Provider:</label>
      				<input type="text" className="form-control" id="provider" value={this.state.provider} />
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="refphy">Referring Physician:</label>
      				<input type="text" className="form-control" id="refphy" value={this.state.referprovider} />
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="employer">Employer:</label>
      				<input type="text" className="form-control" id="employer" value={this.state.employer}/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="empstatus">Employment Status:</label>
      				<input type="text" className="form-control" id="empstatus" value="Employed"/>
      			</div>
      			<div className="form-inline padding-ib">
      				<label for="notes">Notes:</label>
      				<textarea className="form-control" rows="16" cols="50" id="textarea" ></textarea>
      			</div>
      		</div>
        </div>
    );
  }
}

export default PatientDemographics;
