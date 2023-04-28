import React, { Component } from "react";
import axios from "axios";

const url = "http://localhost:1050/bookFlight/";
const url1 = "http://localhost:1050/getFlightIds/";

class CreateBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        customerId: "",
        flightId: "",
        noOfTickets: "",
      },
      formErrorMessage: {
        customerId: "",
        flightId: "",
        noOfTickets: "",
      },
      formValid: {
        customerId: false,
        flightId: false,
        noOfTickets: false,
        buttonActive: false,
      },
      flightIds: [],
      errorMessage: "",
      successMessage: "",
    };
  }

  componentDidMount() {
    this.fetchFlightIds();
  }
  submitBooking = () => {
    axios
      .post(url, this.state.form)
      .then((response) => {
        this.setState({
          successMessage:
            "Flight booking is successful with booking Id: " +
            this.state.form.flightId,
          errorMessage: "",
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            successMessage: "",
            errorMessage: error.response.data.message,
          });
        } else {
          this.setState({ successMessage: "", errorMessage: error.message });
        }
      });
    /* 
      Make a POST request to http://localhost:1050/bookFlight/ with form data 
      and handle success and error cases 
    */
  };

  fetchFlightIds = () => {
    axios
      .get(url1)
      .then((response) => {
        console.log("response", response.data);
        this.setState({ flightIds: response.data, errorMessage: "" });
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({ flightIds: [], errorMessage: error.message });
        } else {
          this.setState({
            flightIds: [],
            errorMessage: "Please start your Express server",
          });
        }
      });
    /* 
      Make a axios GET request to http://localhost:1050/getFlightIds/ to fetch the flightId's array 
      from the server and handle the success and error cases appropriately 
    */
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.submitBooking();
    /* prevent page reload and invoke submitBooking() method */
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let form = this.state.form;
    form[name] = value;
    this.setState({ form: value });
    this.validateField(name, value);
  };

  validateField = (fieldName, value) => {
    let formValid = this.state.formValid;
    let formError = this.state.formErrorMessage;
    switch (fieldName) {
      case "customerId":
        {
          var pattern = new RegExp("^[A-Z][0-9]{4}$");
          pattern.test(value)
            ? (formValid.customerId = true)
            : (formValid.customerId = false);
          pattern.test(value)
            ? (formError.customerId = "")
            : (formError.customerId = "entered format is not correct");
        }
        break;
      case "flightId":
        value === ""
          ? (formValid.flightId = false)
          : (formValid.flightId = true);
        value === ""
          ? (formError.flightId = "select the flight")
          : (formError.flightId = "");
        break;
      case "noOfTickets":
        value >= 1 && value <= 10
          ? (formValid.noOfTickets = true)
          : (formValid.noOfTickets = false);
        value >= 1 && value <= 10
          ? (formError.noOfTickets = "")
          : (formError.noOfTickets =
              "its should be greater than 0 and less than 11");
        break;
      default:
        break;
    }

    formValid.buttonActive =
      formValid.customerId && formValid.flightId && formValid.noOfTickets;
    this.setState({ formErrorMessage: formError, formValid: formValid });
    /* Perform Validations and assign error messages, Also, set the value of buttonActive after validation of the field */
  };

  render() {
    var element = [];

    var row = null;
    for (const item of this.state.flightIds) {
      row = <option value={item}>{item}</option>;
      element.push(row);
    }
    return (
      <div className="CreateBooking ">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <br />
            <div className="card">
              <div className="card-header bg-custom">
                <h3>Flight Booking Form</h3>
              </div>
              <div className="card-body">
                <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
                  <div className="form-group">
                    <label htmlFor="customerId">Customer Id</label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerId"
                      required
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.form.customerId}
                      name="customerId"
                      placeholder="e.g-P1001"
                    />
                  </div>
                  <span className="text-danger">
                    {this.state.formErrorMessage.customerId}
                  </span>
                  <label htmlFor="flightId">Flight Id</label>
                  <select
                    className="form-control"
                    id="flightId"
                    required
                    onChange={(e) => this.handleChange(e)}
                    name="flightId"
                    value={this.state.form.flightId}
                  >
                    <option value="">--Select--</option>
                    {element}
                  </select>
                  <span className="text-danger">
                    {this.state.formErrorMessage.flightId}
                  </span>
                  <br />
                  <div className="form-group">
                    <label htmlFor="noOfTickets">Number of tickets</label>
                    <input
                      type="number"
                      className="form-control"
                      id="noOfTicket"
                      required
                      onChange={(e) => this.handleChange(e)}
                      name="noOfTickets"
                      placeholder="max 10,min 1"
                      value={this.state.form.noOfTickets}
                    />
                  </div>
                  <span className="text-danger">
                    {this.state.formErrorMessage.noOfTickets}
                  </span>
                  <br />

                  <button
                    type="submit"
                    className="btn btn-info"
                    disabled={!this.state.formValid.buttonActive}
                  >
                    Book Flight
                  </button>
                  <span className="text-success">
                    {this.state.successMessage}
                  </span>
                  <span className="text-danger">{this.state.errorMessage}</span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBooking;
