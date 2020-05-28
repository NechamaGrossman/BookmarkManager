import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { AccountContext } from './AccountContext';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <AccountContext.Consumer>
        {value => {
            const { user } = value;
            return <Route {...rest} render={(props) => (
                !!user ? <Component {...props} /> : <Redirect to='/login' />
            )} />
        }}
    </AccountContext.Consumer>

)

export default PrivateRoute;