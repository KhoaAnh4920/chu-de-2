import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { userIsAuthenticated, userIsNotAuthenticated, adminIsAuthenticated, adminIsNotAuthenticated } from '../hoc/authentication';
import CustomScrollbars from '../components/CustomScrollbars';
import { path } from '../utils'

import Home from '../routes/Home';
import Login from '../routes/Login';
import UserLogin from '../components/Auth/UserLogin';
import SignUp from '../components/Auth/SignUp';
import Header from './Header/Header';
import System from '../routes/System';
import HomePage from '../components/HomePage/HomePage';
import allProduct from '../components/HomePage/allProduct';
import PlayBar from '../components/Share/PlayBar';
import Playlist from '../components/HomePage/Playlist';
import { withRouter } from 'react-router';
import SearchPage from '../components/HomePage/SearchPage';
import LikedSongPage from '../components/HomePage/LikedSongPage';
import Libary from '../components/HomePage/Libary';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedInUser: false
        }
    }

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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isLoggedInUser !== this.props.isLoggedInUser) {
            this.setState({
                isLoggedInUser: this.props.isLoggedInUser
            })
        }

        if (prevProps.listSongs !== this.props.listSongs) {
            this.setState({
                listSongs: this.props.listSongs
            })
        }
    }

    render() {

        console.log('Check state: ', this.state.isLoggedInUser)
        let { isLoggedInUser } = this.state;
        let { listSongs } = this.props;

        console.log("listSongs: ", listSongs)

        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">

                        {/* {this.props.isLoggedIn && <Header />} */}

                        <span className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(HomePage)} />
                                    <Route path={path.ADMIN_LOGIN} component={adminIsNotAuthenticated(Login)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(UserLogin)} />
                                    <Route path={path.ALL} component={(allProduct)} />
                                    <Route path={path.SIGNUP} component={userIsNotAuthenticated(SignUp)} />
                                    <Route path={path.ADMIN} component={adminIsAuthenticated(System)} />
                                    <Route path={path.PLAYLIST} component={(Playlist)} />
                                    <Route path={path.ALBUM} component={(Playlist)} />
                                    <Route path={path.SEARCH} component={(SearchPage)} />
                                    <Route path={path.LIKE_SONG} component={(LikedSongPage)} />
                                    <Route path={path.LIBARY} component={(Libary)} />
                                </Switch>
                            </CustomScrollbars>

                        </span>

                    </div>
                </Router>


                {(window.location.href.indexOf("/login") === -1 && window.location.href.indexOf("/admin") === -1 &&
                    window.location.href.indexOf("/sign-up") === -1) &&

                    <PlayBar listSongs={listSongs} />
                }

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.admin.isLoggedIn,
        isLoggedInUser: state.user.isLoggedInUser,
        listSongs: state.user.listSongs
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);