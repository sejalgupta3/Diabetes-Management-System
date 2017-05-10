import React, { Component } from 'react';


class LoginCheck extends Component {
  constructor(props) {
    super(props);


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
		this.makePostRequest('http://35.161.81.114:9000/doctor/loginCheck', name ,function(json){
		    }.bind(this));
	 }

ValidateUser = () => {

	    var email = document.getElementById("email").value;
	    var pwd = document.getElementById("pwd").value;
	    var userType = document.getElementById("userType").value;
	    var loginDetails = {email : email , pwd : pwd, userType : userType};
	    this.getPatientList(loginDetails);
	  }


  /*Function meant to fetch userType from API*/

  render() {
    return (
      <div>
      <section id="login">
      <div className="container">
          <div className="row">
      	    <div className="col-xs-12">
          	    <div className="form-wrap">
                  <h1>Log in with your email account</h1>
                      <form role="form" id="login-form" autocomplete="off"  onSubmit={this.ValidateUser}>
                      <input type="radio" id="userType" name="userType" value="Doctor" /> Doctor
                      <input type="radio" id="userType"  name="userType" value="Patient"/> Patient
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
