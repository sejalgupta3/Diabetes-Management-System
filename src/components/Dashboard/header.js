import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
          <nav className="navbar navbar-static-top" role="navigation">
          <a className="navbar-brand "  href="# ">
            <span className="glyphicon glyphicon-tint">
              <font>Healthify</font>
            </span>
          </a>
      </nav>
    );
  }
}

export default Header;
