import React  from 'react';

class Login extends React.Component{

    render(){
        return(
        <>
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter email " id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter password" id="password" name="password" />
                <button>Log In</button>
            </form>
        </>
      );
    }
  }
  
export default Login;
