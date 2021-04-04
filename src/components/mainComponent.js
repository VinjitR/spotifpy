import React, { Component } from "react";
import {Jumbotron as Jumbo, Container} from 'react-bootstrap';
import {Switch,Route, BrowserRouter} from 'react-router-dom'; 
import { Login } from "./loginComponent";
import  Home  from "./HomeC";

class Main extends Component {
  render() {
    return (
        <BrowserRouter> 
        <Switch>
        <Route path="/" component={Login} exact/>
        <Route path="/Home" component={Home}  />
        </Switch>
        </BrowserRouter>
    );
  }
}
 
export default Main;