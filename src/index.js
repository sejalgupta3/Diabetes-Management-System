import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginCheck from './components/LoginCheck';
import Landing from './components/home';


ReactDOM.render((
   <BrowserRouter>
     <div>
       <Route path="/dashboard" component={Dashboard}/>
       <Route path="/login" component={LoginCheck}/>
       <Route path="/landing" component={Landing}/>
     </div>
   </BrowserRouter >
), document.getElementById( 'root' ) )
