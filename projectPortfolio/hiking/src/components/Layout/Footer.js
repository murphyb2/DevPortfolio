import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Footer extends Component {
  render() {
    var year = new Date().getFullYear(); //Current Year
    return (
      <footer className="my-3 mx-auto text-center">
        <div className="col mx-auto">
          Powered by:{" "}
          <Link to="https://www.hikingproject.com/data">
            Hiking Project Data API
          </Link>
        </div>
        <div className="col mx-auto">Bryan Murphy &copy; {year}</div>
      </footer>
    );
  }
}

export default Footer;
