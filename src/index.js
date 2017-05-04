import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginCheck from './components/LoginCheck';

ReactDOM.render((
   <BrowserRouter>
     <div>
       <Route path="/dashboard" component={Dashboard}/>
       <Route path="/login" component={LoginCheck}/>
       </div>
   </BrowserRouter >
), document.getElementById( 'root' ) )
