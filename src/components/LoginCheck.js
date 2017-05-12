import React, { Component } from 'react';


class LoginCheck extends Component {
  constructor(props) {
    super(props);
    this.getPatientList = this.getPatientList.bind(this);
  }

  makePostRequest(url,params, callback) {
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
	  this.makePostRequest('http://35.161.81.114:9000/doctor/loginCheck', name ,function(json){
		  if( name.userType==="Patient"){
			  window.location = '/dashboard/?user=patient&id=' + json.id + "#/home" ;
		  }
		  else{
			  window.location = '/dashboard/searchPatient';
		  }
		}.bind(this));
	 }

  ValidateUser = () => {
		var email = document.getElementById("email").value;
    var pwd = document.getElementById("pwd").value;

    var userType = document.getElementsByName("userType")
    if(email=="" || pwd =="") {
      alert("Empty fields ");
    }
    else {
    var u_value;
    for(var i = 0; i < userType.length; i++){
        if(userType[i].checked){
        	u_value = userType[i].value;
        }
    }
    var loginDetails = {email : email , pwd : pwd, userType : u_value};
    this.getPatientList(loginDetails);
  }
 }

  render() {
    return (
      <div className = "homePage">
      <section id="login">
      <div className="container">
          <div className="row">
      	    <div className="col-xs-12">
          	    <div className="form-wrap">
                  <h1>Log in with your email account</h1>
                      <form role="form" id="login-form" autocomplete="off"  onSubmit={this.ValidateUser}>

                     <div className="form-group">
                      <input type="radio" id="doc" name="userType" value="Doctor" />   I am a Doctor

                      <input type="radio" id="pat"  name="userType" value="Patient"/>   I am a Patient

                     </div>

                          <div className="form-group">
                              <label for="email" className="sr-only">Email</label>
                              <input type="email" name="email" id="email" className="form-control" placeholder="somebody@example.com"/>
                          </div>
                          <div className="form-group">
                              <label for="key" className="sr-only">Password</label>
                              <input type="password" name="key" id="pwd" className="form-control" placeholder="Password"/>
                          </div>

                          <input type="submit" id="btn-login" className="btn btn-custom btn-lg btn-block" value="Log in"/>
                      </form>

          	    </div>
      		</div>
      	</div>
      </div>
  </section>
      </div>
    );
  }
}

export default LoginCheck;
