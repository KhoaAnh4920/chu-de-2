import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './SignUp.scss';
import { Link, withRouter } from 'react-router-dom';
import DatePicker from '../Input/DatePicker';
import Swal from 'sweetalert2';
import { signUpNewUser } from "../../services/UserService";
import * as actions from "../../store/actions";


class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            repeatEmail: '',
            password: '',
            userName: '',
            fullName: '',
            birthday: '',
            gender: '',
            errors: {},
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let errors = {};
        let arrInput = ['email', 'password', 'userName', 'repeatEmail', 'birthday', 'gender']
        for (let i = 0; i < arrInput.length; i++) {
            // this.state[arrInput[i]] == this.state.email or this.state.password
            if (!this.state[arrInput[i]]) {
                isValid = false;
                errors[arrInput[i]] = "Cannot be empty";
            }
        }

        if (!isValid) {
            Swal.fire({
                title: 'Missing data?',
                text: "Vui lòng điền đầy đủ thông tin!",
                icon: 'warning',
            })

            this.setState({ errors: errors });
        }
        if (this.state.email !== this.state.repeatEmail) {
            isValid = false;
            Swal.fire({
                title: 'Vui lòng nhập email',
                text: "Email không trùng khớp!",
                icon: 'warning',
            })
            errors['email'] = "Không trùng khớp";
            errors['repeatEmail'] = "Không trùng khớp";
            this.setState({ errors: errors });
        }

        return isValid;
    }


    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleSaveUser = async () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.setState({
                isShowLoading: true
            })

            console.log(this.state);
            let formatedDate = new Date(this.state.birthday).getTime(); // convert timestamp //

            let res = await signUpNewUser({
                email: this.state.email,
                password: this.state.password,
                userName: this.state.userName,
                fullName: this.state.userName,
                birthday: formatedDate,
                gender: +this.state.gender
            })

            if (res && res.errCode === 1) {
                let errors = {};
                Swal.fire({
                    title: 'Đăng ký không thành công',
                    text: "Email đã tồn tại!",
                    icon: 'warning',
                })
                errors['email'] = "Email đã tồn tại";
                errors['repeatEmail'] = "Email đã tồn tại";
                this.setState({ errors: errors });
            }
            else if (res && res.errCode === 0 && res.user) {
                await console.log("Check user: ", res.user);

                this.props.userLoginSuccess(res.user[0]);
                this.props.history.push('/')
            }

        }

    }




    render() {
        let { email, password, repeatEmail, userName, birthday, errors } = this.state;


        return (
            <>
                <div className='signUp-user-container'>
                    <div className='col-12 total-signUp'>
                        <div className='top-logo'>
                            <img src="https://res.cloudinary.com/cdmedia/image/upload/v1647319589/image/Logo_Login_slmajq.png" />
                        </div>
                        <div className='row'>
                            <div className='col-3'></div>
                            <div className='signUp-container col-6'>
                                <h1 className='textSignUp'>Sign up for free to start listening.</h1>
                                <button className='btn btn-signUp-facebook'><i class="fab fa-facebook-square"></i>CONTINUE WITH FACEBOOK</button>
                                <div className='dash-or'>
                                    <hr className='dash-hr' />
                                    <span>OR</span>
                                    <hr className='dash-hr' />
                                </div>
                                <div className='form-signUp'>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">What's your email?</label>
                                        <input type="email" className="form-control"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(event) => this.handleOnChangeInput(event, 'email')}

                                        />
                                        <span style={{ color: "red" }}>{errors["name"]}</span>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Confirm your email</label>
                                        <input type="email" className="form-control"
                                            placeholder="Enter email"
                                            value={repeatEmail}
                                            onChange={(event) => this.handleOnChangeInput(event, 'repeatEmail')}
                                        />
                                        <span style={{ color: "red" }}>{errors["name"]}</span>

                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Create a password</label>
                                        <input type="password" className="form-control"
                                            placeholder="Create a password"
                                            value={password}
                                            onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                        />
                                        <span style={{ color: "red" }}>{errors["name"]}</span>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">What should we call you?</label>
                                        <input type="text" className="form-control"
                                            placeholder="Enter Username"
                                            value={userName}
                                            onChange={(event) => this.handleOnChangeInput(event, 'userName')}
                                        />
                                        <span>This appears on your profile.</span>
                                        <span style={{ color: "red" }}>{errors["name"]}</span>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">What's your date of birth?</label>
                                        <DatePicker
                                            onChange={this.handleOnChangeDatePicker}
                                            className="form-control"
                                            value={birthday}

                                        />
                                        <span style={{ color: "red" }}>{errors["name"]}</span>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">What's your gender?</label>
                                        <div>
                                            {/* Default inline 1*/}
                                            <div className="custom-control custom-radio custom-control-inline radido-male">
                                                <input type="radio"
                                                    className="custom-control-input"
                                                    id="defaultInline1"
                                                    name="inlineDefaultRadiosExample"
                                                    value={1}
                                                    onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                                />
                                                <label className="custom-control-label" htmlFor="defaultInline1">Nam</label>
                                            </div>
                                            {/* Default inline 2*/}
                                            <div className="custom-control custom-radio custom-control-inline radido-female">
                                                <input type="radio"
                                                    className="custom-control-input"
                                                    onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                                    id="defaultInline2"
                                                    value={0}
                                                    name="inlineDefaultRadiosExample" />
                                                <label className="custom-control-label" htmlFor="defaultInline2">Nữ</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='button-signUp-submit'>
                                        <button className='btn btn-signUp' onClick={() => this.handleSaveUser()}>Sign up</button>
                                    </div>
                                    <div className='have-account'>
                                        <p className='text-have-account'>Have an account?<Link to="/login" className="link-login"> Log in.</Link></p>
                                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
