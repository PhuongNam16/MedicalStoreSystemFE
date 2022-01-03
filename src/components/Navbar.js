import React from "react";
import Config from "../utils/Config";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="#" className="bars" onClick={this.props.onBarClick}></a>
            <a className="navbar-brand" href="#">
              HỆ THỐNG QUẢN LÝ CỦA HÀNG THUỐC
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
