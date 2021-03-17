/**
 *
 * app.js
 *
 */

 import React from 'react';
 import ReactDOM from 'react-dom';
 import RegisterPage from './pages/register';
 import {Register} from './components/Register';
 import {BrowserRouter, Route, Switch} from 'react-router-dom';
 import {ProtectedRoute} from './ProtectedRoute';
 import Layout from './components/Layout';
 import DashboardPage from './pages/dashboard';
 
//  import ScrollToTop from './scrollToTop';
//  import setToken from './utils/token';


 
 // Authentication
 const token = localStorage.getItem('token');
 
 const app = () => (
    <div>
    <BrowserRouter>
        <Switch>
            <ProtectedRoute exact path='/' component={DashboardPage} />
            <Route exact path='/register' component={Register} />
            <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
    </BrowserRouter>
</div>
 );
 
 export default app;
 