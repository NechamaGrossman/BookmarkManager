import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AccountContext } from '../AccountContext';

class Layout extends Component {
    render() {
        return (
            <AccountContext.Consumer>
                {value => {
                    const { user } = value;
                    const isLoggedIn = !!user;
                    return (
                        <div>
                            <nav className="navbar navbar-inverse navbar-fixed-top">
                                <div className="container">
                                    <div className="navbar-header">
                                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                            <span className="sr-only">Toggle navigation</span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                        <Link className="navbar-brand" to='/'>React Auth Demo</Link>
                                    </div>
                                    <div id="navbar" className="collapse navbar-collapse">
                                        <ul className="nav navbar-nav">
                                            <li> <Link to="/">Home</Link></li>
                                            {!isLoggedIn && <li><Link to='/signup'>Signup</Link></li>}
                                            {!isLoggedIn && <li><Link to='/login'>Login</Link></li>}
                                            {!!isLoggedIn && <li><Link to='/Logout'>Logout</Link></li>}
                                            {!!isLoggedIn && <li><Link to='/MyBookmarks'>My Bookmarks</Link></li>}
                                        </ul>
                                    </div>
                                </div>
                            </nav>

                            <div className="container" style={{ marginTop: 60 }}>
                                {this.props.children}
                            </div>
                        </div>
                    )
                }}
            </AccountContext.Consumer>

        );
    }
}

export default Layout;
