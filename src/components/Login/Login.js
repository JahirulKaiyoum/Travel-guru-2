import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    }
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    accountCreated: false,
    confirmPassWord:'',
    

  })
  const [newUser, setNewUser] = useState(false);

  const [pass, setPass] = useState(
     {
      password: '',
      confirmPass:'',
    }
  );
  
  const handleBlur = (e) => {
    
    
    let isFormValid = true;
    //let passVal = "";

    if (e.target.name === "email") {

       isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {

      const  isPasswordValid = e.target.value.length > 8;
      const isPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e.target.value);
      isFormValid = isPasswordValid && isPassword;

      const newpass = {e.target.name: e.target.value }
      setPass(newpass)


     // passVal = passVal + e.target.value;
      // console.log(passVal);

    }
   

    if (e.target.name === "confirmPassword") {
      pass.confirmPass = e.target.value;
       
      
      // if (confirmPass === passVal) {
      //   isFormValid = true;
      // //  console.log('pass matched');
      // }
      // else {
      //   isFormValid = false;
      // //  console.log("pass did not matched");
      // }
    }
    



    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    
    }
  };
  console.log(pass);







  const handleSubmit = (e) => {
 
  if (newUser&& user.email && user.password) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
        const newUserInfo = { ...user };
        newUserInfo.error = '';
        newUserInfo.accountCreated=true;
        setUser(newUserInfo);
        updateUserInfo(user.name);
       
      })
      .catch( (error)=>{
        const newUserInfo = { ...user };
        newUserInfo.error = error.message;
      const  errorCode = error.code;
        const errorMessage = error.message;
        newUserInfo.accountCreated = false;
        setUser(newUserInfo);

    });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(result => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.accountCreated=true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          
        })
        .catch(function (error) {
          console.log(error);
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
        const  errorCode = error.code;
          const errorMessage = error.message;
          newUserInfo.accountCreated = false;
          setUser(newUserInfo);
         // console.log(errorMessage,errorCode);
        
      });
    }
  e.preventDefault();
}


  const updateUserInfo = (name) => {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
  
    }).then(function() {
      
    }).catch(function(error) {
      
    });
}

          //googleSign
  
  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const { displayName, email } = result.user;
        
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
        };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
       
      });
  };
  //fbSignIn
  const handleFbSignIn = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        const { displayName, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
        };
        setLoggedInUser(signedInUser);
        history.replace(from);
      console.log(user);
    })
      
      .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      
    });
  }
  const handleSignOut = () => {
   
    firebase
      .auth()
      .signOut()
      .then((response) => {
        const signOutUser = {
          isSignedIn: false,
          email: "",
          password: "",
          name: "",
          photo: "",
          success: false,
        };
        setUser(signOutUser);
      })
      .catch(function (error) {});
  };





  return (
    <section>
      <div className="container">
        
        

        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit} className="form-design">
              
              <input type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)  } />
              <label htmlFor="newUser"> SignUp if you don't have an account</label>

              {newUser && < input className="form-control" type="text" name="first-name" placeholder="first name" onBlur={handleBlur} required />}<br />
              {newUser && <input className="form-control" type="text" name="last-name" placeholder="last name" onBlur={handleBlur} required />}<br />
              
              <input className="form-control" type="email" name="email" placeholder="email" onBlur={handleBlur} required /><br/>
              <input className="form-control" type="password" name="password" placeholder="password" onBlur={handleBlur} required /> <br />
              {newUser&& <input className="form-control"  type="password" name="confirmPassword" placeholder="Confirm password" onBlur={handleBlur} required/> }<br/>
              {newUser ? <input className="form-control btn-login" type="submit" value="Create an Account" />:  <input className="form-control btn-login" type="submit" value="Login" />}
              {
                user.accountCreated ? <p style={{color: "green"}}>Account {newUser? "created" :"LoggedIn "} successfully</p> : <p style={{color: "red"}}>{user.error}</p>
              }
              {
                newUser ?
                  <p className='text-center'>Have an account ? <span toggle-Btn onClick={() => setNewUser(!newUser)}>Login</span></p>
                  : <p className='text-center'>Have an account ? <span className="toggle-Btn" onClick={() => setNewUser(!newUser)}>SignUp</span></p>
              }
              
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <button className="external-login-btn" onClick={handleGoogleSignIn}>Continue with Google </button>
            <button className="external-login-btn" onClick={handleFbSignIn}>Continue with Facebook</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

