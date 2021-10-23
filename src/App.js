import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link,Redirect } from "react-router-dom";
// import the necessary modules here
import CreateBooking from "./components/CreateBooking.js"
import GetBooking from "./components/GetBookings"
import UpdateBooking from "./components/updateBooking"

// DO NOT REMOVE THE BELOW CODE
import Evaluator from './components/evaluator';
import "./App.css";

class AppComp extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* DO NOT REMOVE THE BELOW COMPONENT STATEMENT */}
          <Evaluator></Evaluator>
          <nav className="navbar navbar-expand-lg navbar-light  bg-custom">
            <span className="navbar-brand">Infy Airlines</span>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/bookFlight">
                  Book Flight
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/viewBookings">
                  View Bookings
                </Link>
              </li>

            </ul>
          </nav>
          <br/>
               <Switch>
                <Route exact path="/" render={() => <Redirect to='/bookFlight'/>} ></Route>
                <Route exact path="/bookFlight" component={CreateBooking}></Route>
                <Route exact path="/viewBookings" component={GetBooking}></Route>
                <Route exact path="/updateBooking/:bookingId" component={UpdateBooking}></Route>
                <Route exact path="/*" component={CreateBooking}></Route>
              </Switch>
        </div>
      </Router>
    );
  }
}

export default AppComp;