import React, { useState,useContext,useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Axios from 'axios' 
import g from './g.png'
import { CredentialsContext } from "../App";
import './Login.css'
import quotes from '../QuotesData/quotes.json'
import {Link} from 'react-router-dom'
const clientId = "266268893599-a2u3ibqb510hrj56h468klgepcfvk3fr.apps.googleusercontent.com";


function Login() {
  const [, setCredentials] = useContext(CredentialsContext);
  const [loading, setLoading] = useState('Loading...');
  const [user, setUser] = useState(null);
  const random = Math.floor(Math.random() * quotes.length);
  
  const handleLoginSuccess = async (response) => {
    console.log("Login Success ", response);
    
    setUser(response.profileObj);
    
    const profile=response.profileObj
   
    setLoading();
     
  }
  const setDb =() =>{
    setCredentials({
     user: user.email
    
    });
    Axios.post('https://goal-app-fullstack.herokuapp.com/register',{
      name:user.email,
           
    });
    
  }
 
  const handleLoginFailure = error => {
    console.log("Login Failure ", error);
    setLoading();
  }
 
  const handleLogoutSuccess = (response) => {
    console.log("Logout Success ", response);
    setUser(null);
  }
 
  const handleLogoutFailure = error => {
    console.log("Logout Failure ", error);
  }
 
  const handleRequest = () => {
    setLoading("Loading...");
  }
 
  const handleAutoLoadFinished = () => {
    setLoading();
  }
 
  return (
    <div>
 
      {user ? <div className='logged'>
      <GoogleLogout
         render={(renderProps) => (<div className='loggedoutText'>
         <text  onClick={renderProps.onClick} className='loggedoutText'>Logout</text>
       </div>)}
          clientId={clientId}
          onLogoutSuccess={handleLogoutSuccess}
          onFailure={handleLogoutFailure}
        />
        <div className="name">
        <img className='profileImage' src={user.imageUrl}  />
         <text style={{marginTop:"10px"}} >Welcome {user.name}!</text>
         <div className='quotes'>
           <text className='quotesText'>"{quotes[random].text}"</text>
          <div className='author'> <text >{quotes[random].from}</text></div>
           </div>
          </div>
        
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        <text style={{marginTop:"10px"}} ></text>
        <Link className='screen'  to='/Todo' onClick={setDb} >
          <button >Make Some new Goals!!!</button></Link>
        
      </div> :<div className='background'>

        <GoogleLogin
         render={(renderProps) => (<div className='loginText'>
          <img  onClick={renderProps.onClick} src={g} className="gicon" />
          <text style={{marginTop:"10px"}} onClick={renderProps.onClick} className='loginText'>Login</text>
        </div>)}
          clientId={clientId}
          buttonText={loading}
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          onRequest={handleRequest}
          onAutoLoadFinished={handleAutoLoadFinished}
          isSignedIn={true}
        />

        </div>}
    </div>
  );
}
 
export default Login;