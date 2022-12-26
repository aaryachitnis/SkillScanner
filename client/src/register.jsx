import React  from 'react';
import registrationError from './registrationError';

export default class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // attributes of the Register class 
      email: "",
      password: "",
      confirmPassword: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  handleSubmit(event) {
    // so that the form doesn't automatically refresh
    event.preventDefault();
    // stores the value of the state in variables email and password
    const { email, password, confirmPassword} = this.state;
    // shows the state that is captured in console. Only for testing purposes 
    console.log ( email, password, confirmPassword);

    try{
      const response =  fetch ('http://localhost:3001/register', {
        method: "POST",
        crossDomain: true,
        headers: { 
          "Content-Type": "application/json",
          Accept:"application/json",
          "Accept-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
          email, password, confirmPassword,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        registrationError();
      })
    } 
    catch (err){
      console.log(err);
    }
  }
    // displaying the registration form 
    render(){
      return(
        <>
          <h4>Password requirements:</h4>
          <ul>
            <li>Minimum 10 characters</li>
            <li>Contains a number</li>
            <li>Contains a capital letter</li>
            <li>Contains a special character</li>
          </ul>

          <form onSubmit={this.handleSubmit}>
            <p>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email" id="email" required
            // updates state of email 
            onChange={(e) => this.setState({ email: e.target.value })}
            />
            </p>
            <p>
            <label htmlFor="password">Password</label>
            <input  placeholder="Enter password" id="password" required
            // updates state of password
            onChange={(e) => this.setState({ password: e.target.value })}
            />
            </p>
            <p>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input  placeholder="Confirm password" id="confirmPassword" required
            // updates state of password
            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
            />
            </p>
            <button>Register</button>
          </form>
        </>
      );
    }
}



