import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import CustomScrollbars from '../components/CustomScrollbars';
import { path } from '../utils'

import Home from '../routes/Home';
import Login from '../routes/Login';
import Header from './Header/Header';
import System from '../routes/System';
import HomePage from '../components/HomePage/HomePage';



class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">

                        {/* {this.props.isLoggedIn && <Header />} */}

                        <span className="content-container">

                            <Switch>
                                <Route path={path.HOME} exact component={(HomePage)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.ADMIN} component={(System)} />
                            </Switch>

                        </span>

                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);