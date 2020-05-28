import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import MyBookmarks from './Pages/MyBookmarks'
import { AccountContextComponent } from './AccountContext';
import PrivateRoute from './PrivateRoute';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <AccountContextComponent>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/MyBookmarks' component={MyBookmarks} />
                    <Route exact path='/Logout' component={Logout} />
                </Layout>
            </AccountContextComponent>
        );
    }
}
