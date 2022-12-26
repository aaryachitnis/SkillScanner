import React  from 'react';


export default class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // attributes of the Register class 
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  handleSubmit(event) {
    // so that the form doesn't automatically refresh
    event.preventDefault();
    // stores the value of the state in variables email and password
    const { email, password } = this.state;
    // shows the state that is captured in console. Only for testing purposes 
    console.log ( email, password );

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
          email, password,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email" id="email" required
            // updates state of email 
            onChange={(e) => this.setState({ email: e.target.value })}
            />
            <label htmlFor="password">Password</label>
            <input  placeholder="Enter password" id="password" required
            // updates state of password
            onChange={(e) => this.setState({ password: e.target.value })}
            />
            <button>Register</button>
          </form>
        </>
      );
    }
}



