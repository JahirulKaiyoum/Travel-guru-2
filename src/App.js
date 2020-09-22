import React, { createContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import SinglePlaceDetails from "./components/SinglePlaceDetails/SinglePlaceDetails";
import Hotel from "./components/Hotel/Hotel";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SelectHotel from "./components/SelectHotel/SelectHotel";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/destination">
          <SelectHotel></SelectHotel>
          </PrivateRoute>
          
          <Route exact path="/singlePlaceDetails/:placeName">
            <SinglePlaceDetails></SinglePlaceDetails>
          </Route>
          <Route  path="/home">
            <Home></Home>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
