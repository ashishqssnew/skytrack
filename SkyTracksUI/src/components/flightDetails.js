import React, { Component } from "react";
import CreateBooking from './CreateBooking';
import "../App.css";
import GetFlights from './GetFlights';
//import BookingDetailsCard from "./BookingDetailsCard";

export default class FlightDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            flightData:this.props.flightData,
            availableFlights: this.props.availableFlights,
            bookingDetails:null,
            errorMessage:"",
            
        }
    }
    setBookingDetails = (flightId, flightTime, fare) =>{
        this.setState({
            bookingDetails: {
                origin: this.state.flightData.origin,
                destination: this.state.flightData.destination,
                departureDate: this.state.flightData.departureDate,
                noOfTickets: this.state.flightData.noOfTickets,
                flightId: flightId,
                timing: flightTime,
                charges: Number(fare) * Number(this.state.flightData.noOfTickets)
            }
        })
    }
    render(){
        const {availableFlights}=this.state
       
       
        if(this.state.availableFlights==null){
            // Display the GetFlights page by rendering the GetFlights component
            return <GetFlights/>
        }
        else if(this.state.bookingDetails!=null){
            return <CreateBooking bookingDetails={this.state.bookingDetails}/>
            // Display the CreateBooking page by rendering the CreateBooking component and pass the bookingDetails as props
        } else{
            
            return(
                <React.Fragment>
                <div className="container mt-5">
                    <div className="row">
                        <div className="card custom-card bg-card text-light">
                            <div className="card-body">
                                <div className="row text-center">
                                    <div className="col-md-4">
                                        <h4>{this.state.flightData.departureDate}</h4>
                                        <div className="text-custom">Departure Date</div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>{this.state.flightData.origin} - {this.state.flightData.destination}</h4>
                                        <div className="text-custom">Origin - Destination</div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>{this.state.flightData.noOfTickets} Adult(s)</h4>
                                        <div className="text-custom">Passengers</div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="float-right">
                            {/* Add proper event handlers to the back button */}
                            <button className="btn btn-small  btn-warning" name="goBack" onClick={()=>this.setState({availableFlights:null})}>Go back</button>
                                 
                        </div>
                        <h2>Available Flights:</h2>
                     {availableFlights.map((item ,index)=>{
                         return (
                           <div key={index}>
                             {item.flightTimings.map((flight,i)=>{
                                 return (
                                    <div className="row text-center p-3 mb-2" key={i} style={{backgroundColor:"black",color:"white"}}>
                                    <div className="col-md-3">
                                        <h4>{flight}</h4>
                                        <div className="text-custom">Non Stop</div>
                                    </div>
                                    <div className="col-md-3">
                                        <h4>{item.flightIds[i]} </h4>
                                        <div className="text-custom">Flight Id</div>
                                    </div>
                                    <div className="col-md-3">
                                        <h4>{item.prices[i]}</h4>
                                        <div className="text-custom">Fair per seat</div>
                                    </div>
                                    <div className="col-md-3">
                                        <h4>Total Fare : </h4>
                                       <div> <button className="btn btn-small btn-block btn-primary" name="addPassenger" onClick={()=>{this.setBookingDetails(item.flightIds[i],flight,item.prices[i])}}>Add Passenger</button>
                                       </div>
                                    </div>
                                </div>
                                 )
                             })}
                          </div>
                         )
                     })}
                        
                                  
                              
                       
                    </div>
                </div>
            </React.Fragment>
            )
        }
    }

}