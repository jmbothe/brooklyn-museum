import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class RouteControl extends Component {
  state = {}
  render() { 
    return (
      <Router>
      <Switch>
        <Route path="/" render={this.props.HomeComponent}/>
        <Route path="/login" render={this.props.LoginComponent}/>
        <Route path="/detail" render={this.props.DetailComponent} />
      </Switch>
    </Router>
    )
  }
}
 
export default RouteControl;