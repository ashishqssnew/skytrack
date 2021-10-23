import React, { Component } from "react";
import axios from "axios";

const url = "http://localhost:1050/updatebooking/";

class UpdateBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                bookingId: "",
                noOfTickets: ""
            },
            formErrorMessage: {
                bookingId: "",
                noOfTickets: ""
            },
            formValid: {
                bookingId: true,
                noOfTickets: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            id: this.props.match.params.bookingId
        };
    }

   componentDidMount(){
      this.setState({form:{bookingId:this.state.id}})
   }
    updateBooking = () => {
        axios.put(url+this.state.id,{ "noOfTickets": this.state.form.noOfTickets})
        .then((response)=>{
           this.setState({successMessage:response.data.message})
        })
        .catch((error)=>{
          this.setState({errorMessage:error.response.data.message})
        })
        /* 
          Make a axios PUT request to http://localhost:1050/updatebooking/ to update the number of tickets 
          for the selected bookingId and handle the success and error cases appropriately 
        */
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.updateBooking() ;
        /* prevent page reload and invoke updateBooking() method */
    }

    handleChange = (event) => {
        let name=event.target.name;
        let value=event.target.value;
        this.setState({form:{[name]:value}})
        this.validateField(name,value)
        /* 
          invoke whenever any change happens any of the input fields
          and update form state with the value. Also, Inoke validateField() method to validate the entered value
        */
    }

    validateField = (fieldName, value) => {
        let formValid=this.state.formValid;
        let formError=this.state.formErrorMessage;
        switch(fieldName)
        {
          case "noOfTickets" : (value>=1 && value<=10)?formValid.noOfTickets=true:formValid.noOfTickets=false;
          (value>=1 && value<=10)?formError.noOfTickets="":formError.noOfTickets="its should be greater than 0 and less than 11"
          break;
          default:
            break;                      
        }
                             
        formValid.buttonActive=formValid.noOfTickets;
         this.setState({formErrorMessage:formError,
        formValid:formValid})
        /* Perform Validations and assign error messages, Also, set the value of buttonActive after validation of the field */
    }

    render() {
        return (
            <React.Fragment>
                <div className="UpdateBooking">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <br />
                            <div className="card">
                                <div className="card-header bg-custom">
                                    <h4>Update Flight Booking for id: {this.state.id}</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={(e)=>this.handleSubmit(e)}>
                                <div className="form-group">
                                 <label for="bookingId">Booking Id</label>
                                   <input type="number" className="form-control" id="bookingId" disabled  value={this.state.form.bookingId} name="bookingId" placeholder={this.state.id}/>
                                  </div>
                                  <span className="text-danger">{this.state.formErrorMessage.bookingId}</span>
                
                                  <div className="form-group">
                                  <label for="noOfTickets">Number of tickets</label>
                                  <input type="number" className="form-control" id="noOfTicket" required onChange={(e)=>this.handleChange(e)} name="noOfTickets"  placeholder="max 10,min 1" value={this.state.form.noOfTickets}/>
                                  </div>
                                   <span className="text-danger">{this.state.formErrorMessage.noOfTickets}</span><br/>
                                   <button type="submit" disabled={!this.state.formValid.buttonActive}  className="btn btn-primary">Update Booking</button>
                                   <span className="text-success">{this.state.successMessage}</span>
                                   <span className="text-danger">{this.state.errorMessage}</span>
                                   </form>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default UpdateBooking;