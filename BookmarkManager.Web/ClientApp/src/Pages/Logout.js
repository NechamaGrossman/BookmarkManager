import React from 'react';
import axios from 'axios';
import { AccountContext } from '../AccountContext';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
    componentDidMount = async () => {
        await axios.get('/api/account/logout');
    }

    render() {
        return <AccountContext.Consumer>
            {value => {
                value.logout();
                return <Redirect to='/login' />
            }}
        </AccountContext.Consumer>
    }

}

export default Logout;