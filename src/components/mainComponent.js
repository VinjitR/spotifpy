import React, { Component } from "react";
import {Jumbotron as Jumbo, Container} from 'react-bootstrap';
import {Switch,Route, BrowserRouter} from 'react-router-dom'; 
import { Login } from "./loginComponent";
import  Home  from "./HomeC";
import Trending from "./TrendingC";
import SpotifySearch from "./SpotifySearch";
import {UserdetailsC} from "./UserdetailsC";
import UserRecomms from "./UserRecomms";
import AGRecomms from "./AGRecomms";
import HorchartA from "./HorchartA";
import HorchartT from "./HorchartT";

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <BrowserRouter> 
        <Switch>
        <Route path="/" component={Login} exact/>
        <Route path="/Home" component={Home}  />
        <Route path="/Trends" component={Trending}/>
        <Route path="/Search" component={SpotifySearch}/>
        <Route path="/userdetails" component={UserdetailsC}/>
        <Route path="/recommenu" component={UserRecomms}/>
        <Route path="/recommena" component={AGRecomms}/>
        <Route path="/horcharta" component={HorchartA}/>
        <Route path="/horchartT" component={HorchartT}/>
        </Switch>
        </BrowserRouter>
        </div>
    );
  }
}
 
export default Main;