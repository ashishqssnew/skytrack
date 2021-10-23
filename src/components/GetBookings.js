import React, { Component } from "react";
import axios from "axios";
import Redirect from "../../node_modules/react-router-dom/Redirect";

const url = "http://localhost:1050/getAllBookings/";
const url1 = "http://localhost:1050/deleteBooking/";

class GetBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingData: "",
      bookingId: "",
      updateStatus: false,
      errorMessage: "",
      successMessage: ""
    };
  }


  updateBooking = (bid) => {
    this.setState({bookingId:bid,updateStatus:true})
    /* update the updateStatus and bookingId state with appropriate values */
  }
componentDidMount(){
  this.fetchBooking();
}
  fetchBooking = () => {
    axios.get(url)
    .then((response)=>{
      console.log(response.data);
      this.setState({bookingData:response.data,errorMessage:""})
    })
    .catch((error)=>{
      if(error.status===404)
      {
         this.setState({errorMessage:error.response.data.message,successMessage:""})
      }
   else
   {
       this.setState({errorMessage:"could not fetch the booking Data",successMessage:""})
    }
    })
    /* 
      Send an AXIOS GET request to the url http://localhost:1050/getAllBookings/ to fetch all the bookings 
      and handle the success and error cases appropriately 
    */
  }

  deleteBooking = (id) => {
    axios.delete(url1+id)
    .then((response)=>{
       this.setState({successMessage:response.data.message,errorMessage:""})
       this.fetchBooking();
    })
    .catch((error)=>{
       this.setState({errorMessage:error.response.data.message,successMessage:""})
    })
    /*
      Send an AXIOS DELETE request to the url http://localhost:1050/deleteBooking/ to delete the selected booking
      and handle the success and error cases appropriately 
    */
  }

  render() {
    if (this.state.updateStatus) {
      return <Redirect to={"/updateBooking/" + this.state.bookingId} />
    }


    return (
      <div className="GetBooking">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <br />
            <div className="card">
              <div className="card-header bg-custom">
                <h3 align="center">Booking Details</h3>
              </div>
              <div className="card-body">
                {/* code here to get the view as shown in QP for GetBooking component */}
                {/* Display booking data in tabular form */}
                {/* Display error message if the server is not running */}
                {/* code appropriately to redirect on click of update button */}
                <table className="table table-bordered">
                 <thead>
                 <tr>
                   <th>Customer Id</th>
                   <th>Booking Id</th>
                   <th>Total tickets</th>
                   <th>Total Cost</th>
                   <th>Actions</th>
                 </tr>
                 </thead>
                 <tbody>
                   {this.state.bookingData.length>0 ?
                   
                      this.state.bookingData.map((item)=>{
                        return (<tr>
                          <td>{item.customerId}</td>
                          <td>{item.bookingId}</td>
                          <td>{item.noOfTickets}</td>
                          <td>{item.bookingCost}</td>
                          <td>
                            <button className="btn btn-success" onClick={()=>{this.updateBooking(item.bookingId)}}>Update</button>
                            <button className="btn btn-danger" onClick={()=>this.deleteBooking(item.bookingId) }>Delete</button>
                          </td>
                      </tr>)
                 })
                :null}
                 </tbody>
                </table>
                <span>{this.state.errorMessage}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetBooking;
