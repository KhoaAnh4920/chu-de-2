import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../utils";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../services/adminService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
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
                                                    <form className="user">
                                                        <div className="form-group">
                                                            <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address" />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" />
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="custom-control custom-checkbox small" style={{ lineHeight: '1.5rem' }}>
                                                                <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                                <label className="custom-control-label" htmlFor="customCheck">Remember
                                                                    Me</label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <a href="index.html" className="btn btn-primary btn-block">Login</a>
                                                        </div>

                                                        <div className="col-12 social-login">
                                                            <i className="fab fa-facebook-f facebook"></i>
                                                            <i className="fab fa-google google"></i>
                                                        </div>

                                                    </form>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
