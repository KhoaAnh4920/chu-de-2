import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../utils";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../services/adminService';
import { hanedleLoginAPI } from '../services/UserService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }


    componentDidMount() {
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        // Clear mã lỗi //
        this.setState({
            errMessage: ''
        })
        try {
            let data = await hanedleLoginAPI(this.state.username, this.state.password); // goi api login //
            if (data && data.errorCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errorCode === 0) {
                console.log('---login ok---');
                console.log(data.data);
                //this.props.testRedux();

                this.props.adminLoginSuccess(data.data);
            }
        } catch (e) {
            // Lấy mã lỗi // 
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data
                    })
                }
            }
        }

    }

    handleShowHidePassWord = () => {
        this.setState({
            isShowPass: !this.state.isShowPass
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }



    render() {

        return (
            <>
                <div className="cover-login">
                    <div className="container-login">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-12 col-md-9">
                                <div className="card shadow-sm my-5">
                                    <div className="card-body p-0">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="login-form">
                                                    <div className="text-center">
                                                        <h3 className="text-gray-900 mb-4">LOGIN</h3>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="email"
                                                            className="form-control"
                                                            id="exampleInputEmail"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Email Address"
                                                            value={this.state.username}
                                                            onChange={(event) => this.handleOnChangeUsername(event)}

                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            value={this.state.password}
                                                            placeholder='Enter your password'
                                                            onChange={(event) => this.handleOnChangePassword(event)}
                                                            onKeyDown={(event) => this.handleKeyDown(event)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox small" style={{ lineHeight: '1.5rem' }}>
                                                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                            <label className="custom-control-label" htmlFor="customCheck">Remember
                                                                Me</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className='btn-login btn btn-primary btn-block' onClick={() => this.handleLogin()} >Login</button>
                                                        {/* <a href="index.html" className="btn btn-primary btn-block" onClick={() => this.handleLogin()} >Login</a> */}
                                                    </div>

                                                    <div className="col-12 social-login">
                                                        <i className="fab fa-facebook-f facebook"></i>
                                                        <i className="fab fa-google google"></i>
                                                    </div>


                                                    <hr />
                                                    <div className="text-center">
                                                        <a className="font-weight-bold small" href="register.html">Create an Account!</a>
                                                    </div>
                                                    <div className="text-center">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        adminLoginSuccess: (userInfo) => dispatch(actions.adminLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
