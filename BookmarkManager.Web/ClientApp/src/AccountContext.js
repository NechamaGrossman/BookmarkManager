import React from 'react';
import axios from 'axios';
const AccountContext = React.createContext();

class AccountContextComponent extends React.Component {

    state = {
        user: null,
        isLoading: true
    }

    componentDidMount = async () => {
        const { data } = await axios.get('/api/account/getcurrentuser');
        this.setUser(data);
        this.setState({ isLoading: false });
    }

    setUser = async user => {
        this.setState({ user });
    }

    logout = () => {
        this.setState({ user: null });
    }

    render() {
        const value = {
            setUser: this.setUser,
            user: this.state.user,
            logout: this.logout
        }
        return (
            <AccountContext.Provider value={value}>
                {this.state.isLoading ? <span></span> : this.props.children}
            </AccountContext.Provider>
        )
    }
}

export { AccountContextComponent, AccountContext }