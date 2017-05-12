import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
          <nav className="navbar navbar-static-top" role="navigation">
            <a className="navbar-brand"  href="/landing">
              <span className="glyphicon glyphicon-tint">
                <font>Healthify</font>
              </span>
            </a>
            <div className="">
            <p className="navbar-text navbar-right">
            <a href="/login" className="navbar-link">
              <span className="glyphicon glyphicon-log-out"></span>
            </a>
            </p>
            </div>
      </nav>
    );
  }
}

export default Header;
