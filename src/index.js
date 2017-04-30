import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/home';

ReactDOM.render((
   <BrowserRouter>
     <div>
       <Route path="/dashboard" component={Dashboard}/>
       <Route path="/mainPage" component={Home}/>
     </div>
   </BrowserRouter >
), document.getElementById( 'root' ) )
