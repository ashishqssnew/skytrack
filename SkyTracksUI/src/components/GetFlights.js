import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import FlightDetails from './flightDetails';


const url = "http://localhost:1050/getFlights/";

export default class GetFlights extends Component {
    constructor(props){
        super(props);
        this.state = {
            availableFlights:null,
            form:{
                origin: "",
                destination: "",
                departureDate: "",
                noOfTickets: 0
            },
            formErrorMessage:{
                originError: "",
                destinationError: "",
                departureDateError: "",
                noOfTicketsError: ""
            },
            formValid:{
                originfield: false,
                destinationfield: false,
                departureDatefield: false,
                noOfTicketsfield: false,
                buttonActive:false,
            },
            errorMessage:"",
            
        }
    }
    submitBooking = () => {
       
        let newurl=url+this.state.form.origin+"/"+this.state.form.destination;
        axios.get(newurl)
        .then((response)=>{
           console.log(response.data)
           this.setState({availableFlights:response.data,errorMessage:""})
        })
        .catch((error)=>{
            if(error.response)
            this.setState({availableFlights:null,errorMessage:error.response.data.message})
            else
            {
                this.setState({availableFlights:null,errorMessage:`sorry! no flight is available between ${this.state.form.origin} and ${this.state.form.destination}`})
            }
        })
        // Make an axios get request to get the flights in the specified route
        // populate the availableFlights or errorMessage appropriately
    };
    handleSubmit = event => {
        event.preventDefault();
         this.submitBooking();
        // Prevent the default behaviour of form submission
        // Call appropriate method to make the axios get request
    };
    handleChange = event => {
        var name =event.target.name;
        var value=event.target.value;
        var form=this.state.form
         form[name]=value;
         this.setState({form:form})
        this.validateField(name,value)
        // Get the names and values of the input fields
        // Update the formValue object in state
        // Call the validateField method by passing the name and value of the input field
    };
    validateField = (fieldName, value) => {
        var formValid=this.state.formValid;
        var formError=this.state.formErrorMessage;
        switch(fieldName){
            case "origin": 
                         if(value==="")
                         {formError.originError="Can not be empty"
                         formValid.originfield=false}
                         else{
                            let pattern =new RegExp("^[A-Za-z]{1,15}$")
                            pattern.test(value)? formValid.originfield=true:formValid.originfield=false;
                            pattern.test(value)? formError.originError="":formError.originError="Please enter valid origin city";
                         }
                         
                break;
            case "destination":
                if(value==="")
                {formValid.destinationfield=false
                    formError.destinationError="Can not be empty"}
                else{
                    let patt =new RegExp("^[A-Za-z]{1,15}$")
                    patt.test(value)? formValid.destinationfield=true:formValid.destinationfield=false;
                    patt.test(value)? formError.destinationError="":formError.destinationError="Please enter valid destination city";
         
                }
                  break;
          case "departureDate": let tDate=new Date(22/5/2018)
                                let dDate=new Date(value)
                         dDate<tDate? formValid.departureDatefield=false:formValid.departureDatefield=true;
                         dDate<tDate? formError.departureDateError="Departure Date can not be before today":formError.departureDateError=""
                break;
         case "noOfTickets":  (value<=5&& value>=1)? formValid.noOfTicketsfield=true :formValid.noOfTicketsfield=false;
         (value<=5&& value>=1)? formError.noOfTicketsError="":formError.noOfTicketsError="No of ticket should be greater than 1 and less than 6"
                break;
      default:
          break;
        }
        formValid.buttonActive=formValid.originfield && formValid.destinationfield && formValid.departureDatefield && formValid.noOfTicketsfield;
        this.setState({formValid:formValid,formErrorMessage:formError})
      
        // Validate the values entered in the input fields
        // Update the formErrorMessage and formValid objects in the state
    };
    render(){
       
        if(this.state.availableFlights!=null){
            // Pass appropriate props to the FlightDetails component below
           
            return (<FlightDetails flightData={this.state.form} availableFlights={this.state.availableFlights}></FlightDetails>)
        } else{
            return(
               
                <React.Fragment>
                   
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-lg-4 offset-lg-1">
                                <div className="card bg-card text-light ">
                                    <div className="card-body">
                                      <form className="form" onSubmit={(e)=>this.handleSubmit(e)}>
                                      <div className="form-group">
                                          <label htmlFor="origin">Origin</label>
                                          <input id="origin"  type="text" placeholder="Origin" className="form-control" onChange={(e)=>this.handleChange(e)} value={this.state.form.origin} name="origin"/>
                                      </div>
                                      <span className="text-danger">{this.state.formErrorMessage.originError}</span>
                                      <div className="form-group">
                                          <label htmlFor="destination">Destination</label>
                                          <input id="destination"  type="text" placeholder="Destination" className="form-control" onChange={(e)=>this.handleChange(e)} value={this.state.form.destination} name="destination"/>
                                      </div>
                                      <span className="text-danger">{this.state.formErrorMessage.destinationErrorError}</span>
                                      <div className="form-group">
                                          <label htmlFor="departureDate">Departure Date</label>
                                          <input id="departureDate"  type="date" className="form-control" onChange={(e)=>this.handleChange(e)} value={this.state.form.departureDate} name="departureDate"/>
                                      </div>
                                      <span className="text-danger">{this.state.formErrorMessage.departureDateError}</span>
                                      <div className="form-group">
                                          <label htmlFor="noOfTickets">No Of Tickets</label>
                                          <input id="noOfTickets"  type="number" placeholder="No of Tickets" className="form-control" onChange={(e)=>this.handleChange(e)} value={this.state.form.noOfTickets} name="noOfTickets"/>
                                      </div>
                                      <span className="text-danger">{this.state.formErrorMessage.noOfTicketsError}</span>
                                      <br/>
                                      <button type="submit" disabled={!this.state.formValid.buttonActive} className="btn btn-primary form-control" name="viewFlightsButton">View Flight</button>
                                      <span className="text-danger">{this.state.errorMessage}</span>
                        
                                      </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }

}