import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import Dashboard from './components/Dashboard';

ReactDOM.render((
   <BrowserRouter>
     <div>
       <Route path="/dashboard" component={Dashboard}/>
     </div>
   </BrowserRouter >
), document.getElementById( 'root' ) )
