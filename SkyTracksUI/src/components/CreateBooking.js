import React, { Component } from "react";
import axios from "axios";
import GetFlights from './GetFlights';
import BookingDetailsCard from './BookingDetailsCard';

const url = "http://localhost:1050/bookFlight/";

class CreateBooking extends Component {
  constructor(props) {
    super(props);
    this.Arr=[]
    this.state = {
      bookingDetails:this.props.bookingDetails,
      passengerData:[],
      form: {
        firstName: "",
        lastName:"",
        title: "",
        age:""
      },
      formErrorMessage: {
        firstNameError: "",
        lastNameError:"",
        ageError:""
      },
      formValid: {
        firstName: false,
        lastName:false,
        age:false,
        buttonActive:false
      },
      errorMessage: "",
      successMessage: "",
      goBack: false
    };
  }

  book = () => {
    let bookingData = this.state.bookingDetails;
    bookingData.passengerDetails = this.state.passengerData;
    axios.post(url,bookingData)
       .then((response)=>{
             this.setState({successMessage:response.data.message,errorMessage:""})
       })
       .catch((error)=>{
            if(error.response)
            {
              this.setState({errorMessage:error.response.data.message,successMessage:""})
            }
            else{
              this.setState({errorMessage:error.message,successMessage:""})
            }
       })
    // Make axios post request to post the bookingData to the given URL
    // populate the successMessage object or the errorMessage
  };

  handleChange = event => {
    var name =event.target.name;
    var value=event.target.value;
    var form=this.state.form
     form[name]=value;
     this.setState({form:form})
    this.validateField(name,value)
     };

  validateField = (fieldName, value) => {
    var formValid=this.state.formValid;
    var formError=this.state.formErrorMessage;
    switch(fieldName){
        case "firstName": let pattern =new RegExp("^[A-Za-z]{1,15}$")
                     pattern.test(value)? formValid.firstName=true:formValid.firstName=false;
                     pattern.test(value)? formError.firstNameError="":formError.firstNameError="Please enter valid first Name";
            break;
        case "lastName": let patt =new RegExp("^[A-Za-z]{1,15}$")
        patt.test(value)? formValid.lastName=true:formValid.lastName=false;
        patt.test(value)? formError.lastNameError="":formError.lastNameError="Please enter valid last name";
break;
     case "age":  (value<=70&& value>=1)? formValid.age=true :formValid.age=false;
     (value<=70&& value>=1)? formError.ageError="":formError.ageError="Age should be greater than 1 and less than or equal to 70"
            break;
  default:
      break;
    }
    formValid.buttonActive=formValid.firstName && formValid.lastName && formValid.age;
    this.setState({formValid:formValid,formErrorMessage:formError})
  };
 
  setPassengerData = (e)=>{
     var obj={
       firstName:this.state.form.firstName,
       lastName:this.state.form.lastName,
       title:this.state.form.title,
       age:this.state.form.age
     }
     
     this.Arr.push(obj);
     this.setState({passengerData:this.Arr})
  
    let form=this.state.form
    let formValid=this.state.formValid
    form.firstName=""
    form.lastName=""
    form.age=""
    formValid.firstName=false;
    formValid.lastName=false;
    formValid.age=false;
    formValid.buttonActive=false;
    this.setState({form:form,formValid:formValid})
    // Update the passengerData array in state
    // reset the form and the formValid object in state
  }
  getPassengerData = ()=>{
    if(this.state.passengerData.length<Number(this.state.bookingDetails.noOfTickets)){
      return(
        <React.Fragment>
          <div className="card bg-card text-light mb-4">
          <div className="card-body">
            <h6>Passenger {this.state.passengerData.length+1}</h6>
              <div className="row">
                <div className="col-md-8">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <select className="btn btn-light" name="title" onChange={(e)=>this.handleChange(e)} value={this.state.form.title}>
                        <option value="" disabled>Title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                      </select>
                    </div>
                    <input   type="text" placeholder="First Name" className="form-control" onChange={(e)=>this.handleChange(e)} value={this.state.form.firstName} name="firstName"/>
                    <div><span className="text-danger">{this.state.formErrorMessage.firstNameError}</span></div>
                    <input  type="text" placeholder="Last Name" className="form-control" onChange={(e)=>this.handleChange(e)} value={this.state.form.lastName} name="lastName"/>               
                    <div><span className="text-danger">{this.state.formErrorMessage.lastNameError}</span></div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                  <input type="number" placeholder="Age" className="form-control" onChange={(e)=>this.handleChange(e)} value={this.state.form.age} name="age"/>
                  <div> <span className="text-danger">{this.state.formErrorMessage.ageError}</span></div>
                                     
                </div>
                </div>
                <div className="col-md-2 text-center">                      
                  <button type="submit" disabled={!this.state.formValid.buttonActive}className="btn btn-primary font-weight-bolder" name="addPassenger" onClick={(e)=>this.setPassengerData(e)}>Add</button>
          
                </div>
              </div>
              <div className="text-danger"> {this.state.errorMessage}  </div>
          </div>
        </div>
        </React.Fragment>
      )
    }
  }
  displayBookingSuccess=()=>{
    return(
      <React.Fragment>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card bg-card custom-card text-light">
                <div className="card-body">

                  {/* Add the booking ID to the below heading, from the successMessage object */}
                  <h4 className="text-success">Booking successful with booking ID:{this.state.successMessage.bookingId}</h4>
                  <BookingDetailsCard bookingDetails={this.state.bookingDetails}/>
                  {/* Display the booking details here by rendering the BookingDetailsCard component and passing successMessage as props*/}

                </div>
                <div className="card-footer">
                 <button name="homeButton" className="btn btn-primary" onClick={()=>this.setState({goBack:true})}>Home</button>
                  {/* Add the Home button here */}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
  
  render() {
    
    if(this.state.goBack){
      return <GetFlights/>
      // Display the GetFlights page by rendering the GetFlights component
    }
    if(this.state.successMessage===""){
      return(
       
        <div className="container mt-5">
            <div className="row">
              <div className="col-lg-7">
                {
                  this.state.passengerData.length>0 ? (
                    this.state.passengerData.map((passenger,index)=>{
                      return(
                        <div className="card bg-card text-light mb-4" key={index}>
                          <div className="card-body">
                            <div className="text-custom">Passenger {index+1}</div>
                            <h4>{passenger.title} {passenger.firstName} {passenger.lastName}, {passenger.age}</h4>
                          </div>
                        </div>
                      )
                    })
                  ): null
                }
                {this.getPassengerData()}
              </div>
              <div className="col-lg-4 offset-lg-1">
                <div name="flightDetails" className="card bg-card text-light">
                  <div className="card-body">
                    <BookingDetailsCard bookingDetails={this.state.bookingDetails}/>
                    {/* Display the booking details here by rendering the BookingDetailsCard component and passing bookingDetails in state as props*/}

                  </div>
                  <div className="card-footer">
                     <button name="bookButton" className="btn btn-warning btn-block" disabled={this.state.bookingDetails.noOfTickets!=this.state.passengerData.length} onClick={()=>this.book()}>Book</button>
                     <button name="goBack" className="btn btn-primary btn-block"onClick={()=>{this.setState({goBack:true})}}>Home</button>
                     <span className="text-danger">{this.state.errorMessage}</span>
                     <span className="text-success">{this.state.successMessage}</span>
                    {/* Add the book, home buttons here and display axios error messages here */}
                    
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    } else{
        return this.displayBookingSuccess();
    }
  }
}

export default CreateBooking;
