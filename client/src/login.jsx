import React  from 'react';

class Login extends React.Component{
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
    const { email, password} = this.state;
    // shows the state that is captured in console. Only for testing purposes 
    console.log ( email, password);

    try{
      const response =  fetch ('http://localhost:3001/login', {
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

  render(){
    return(
        <>
          <h3>Login</h3>
          <form onSubmit={this.handleSubmit}>
            <p> 
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email " id="email" name="email" 
              onChange={(e) => this.setState({ email: e.target.value })}
              />
            </p>
            <p>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter password" id="password" name="password" 
              onChange={(e) => this.setState({ password: e.target.value })}
              />
            </p>
            <button>Log In</button>
          </form>
        </>
      );
    }
  }
  
export default Login;
