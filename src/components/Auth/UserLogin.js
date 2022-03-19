import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserLogin.scss';
import { Link, withRouter } from 'react-router-dom';
import * as actions from "../../store/actions";
import { hanedleLoginUser, handleLoginSocial } from '../../services/UserService';
import FacebookLogin from 'react-facebook-login';

class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userID: "",
            name: "",
            picture: ""
        }
    }

    componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.userID !== this.state.userID && prevState.name !== this.name
            && prevState.email !== this.state.email && prevState.avatar !== this.state) {

            let result = await handleLoginSocial({
                userID: this.state.userID,
                name: this.state.name,
                email: this.state.email,
                avatar: this.state.avatar
            });

            if (result && result.errCode === 0) {

                this.props.userLoginSuccess({
                    id: this.state.userID,
                    fullName: this.state.name,
                    email: this.state.email,
                    avatar: this.state.avatar,
                    roleId: 1
                });
                this.props.history.push('/')
            }
        }


    }

    redirectSignUp = () => {
        this.props.history.push(`/sign-up`)
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
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
            let data = await hanedleLoginUser(this.state.email, this.state.password); // goi api login //
            if (data && data.errorCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errorCode === 0) {
                console.log('---login ok---');

                //this.props.testRedux();

                this.props.userLoginSuccess(data.data);
                this.props.history.push('/')
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

    componentClicked = () => {
        console.log("Clicked")
    }

    responseFacebook = (response) => {


        if (response && response.userID) {
            this.setState({
                userID: response.userID,
                name: response.name,
                email: response.email,
                avatar: response.picture.data.url
            })
        }



        // let result = await handleLoginSocial(data);

        // console.log(result);
    }



    render() {
        console.log(this.state);
        return (
            <>
                <div className='login-user-container'>
                    <div className='col-12 total-login'>
                        <div className='top-logo'>
                            <img src="https://res.cloudinary.com/cdmedia/image/upload/v1647319589/image/Logo_Login_slmajq.png" />
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-3'></div>
                            <div className='login-container col-6'>
                                <p className='textLogin'>To continue, log in to Spotify.</p>
                                {/* <button className='btn btn-login-facebook'><i class="fab fa-facebook-square"></i>CONTINUE WITH FACEBOOK</button> */}
                                <div className='social-login'>
                                    <FacebookLogin
                                        appId="1099784044200990"
                                        autoLoad={true}
                                        fields="name,email,picture"
                                        onClick={this.componentClicked}
                                        cssClass="btn btn-login-facebook"
                                        icon={<i class="fab fa-facebook-square"></i>}
                                        callback={this.responseFacebook} />
                                </div>

                                <div className='dash-or'>
                                    <hr className='dash-hr' />
                                    <span>OR</span>
                                    <hr className='dash-hr' />
                                </div>
                                <div className='form-login'>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control"
                                            placeholder="Enter email"
                                            value={this.state.email}
                                            onChange={(event) => this.handleOnChangeEmail(event)}
                                        />

                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Password</label>
                                        <input type="password" className="form-control"
                                            placeholder="Enter Password"
                                            value={this.state.password}
                                            onChange={(event) => this.handleOnChangePassword(event)}
                                            onKeyDown={(event) => this.handleKeyDown(event)}
                                        />

                                    </div>
                                    <Link to="#" className="link-forgot-pass">Forgot your password</Link>
                                    <div className='submit-container'>
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                            <label class="form-check-label" for="exampleCheck1">Remember me</label>
                                        </div>
                                        <div className='button-login-submit'>
                                            <button className='btn btn-login' onClick={() => this.handleLogin()}>LOG IN</button>
                                        </div>
                                    </div>
                                    <div className='dash-or'>
                                        <hr className='dash-hr' />
                                    </div>
                                    <p className='textLogin'>Don't have an account?</p>
                                    <button className='btn btn-sign-up' onClick={this.redirectSignUp}>SIGN UP FOR SPOTIFAKE</button>
                                </div>
                            </div>
                            <div className='col-3 '> </div>
                        </div>

                    </div>
                </div>
            </>

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserLogin));
