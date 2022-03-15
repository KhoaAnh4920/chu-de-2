import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { history } from '../../redux';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch, NavLink } from 'react-router-dom';
import './Header.scss';
import * as actions from "../../store/actions" // import cả 3 action //


class DefaultClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedInUser: false,
            userInfo: {}
        }
        this.goBack = this.goBack.bind(this);

    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isLoggedInUser !== this.props.isLoggedInUser) {
            this.setState({
                isLoggedInUser: this.props.isLoggedInUser,
            })
        }
    }
    goBack() {
        this.props.history.goBack();
    }


    render() {
        let { userInfo, isLoggedInUser, processLogoutUser } = this.props;

        return (
            <>

                <div className="w3-container header w3-dark top-bar">
                    <button className='left-arrow' onClick={this.goBack}> <i class='fas fa-chevron-left'></i>  </button >
                    <button className='right-arrow' onClick={this.goBack}> <i class='fas fa-chevron-right'></i>  </button>
                    {!isLoggedInUser && <div className='login-container'>
                        <a className='btn-signUp' type='button' href="/sign-up">SIGN UP</a>
                        <a className='btn-login' href="/login" type='button'>LOG IN</a>
                    </div>}
                    {isLoggedInUser && userInfo &&
                        <>
                            <div className="dropdown dropdown-userinfo">
                                <div id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img className='avatar-user' src={userInfo.avatar} />
                                    <span className='user-fullname'>{userInfo.fullName}</span>
                                </div>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={processLogoutUser}>Log out</a>
                                </div>
                            </div>
                        </>


                    }

                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedInUser: state.user.isLoggedInUser,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogoutUser: () => dispatch(actions.processLogoutUser()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultClass));
