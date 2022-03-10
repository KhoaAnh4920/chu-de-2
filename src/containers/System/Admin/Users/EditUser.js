import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './EditUser.scss';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import { CommonUtils } from '../../../../utils';
import Swal from 'sweetalert2';
import { getEditUser, getAllRoles } from '../../../../services/UserService'
import * as actions from "../../../../store/actions" // import cả 3 action //
import LoadingOverlay from "react-loading-overlay";


class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userName: '',
            fullName: '',
            birthday: '',
            listGender: [],
            listRoles: [],
            selectedGender: '',
            selectedRoles: '',
            imagePreviewUrl: '',
            avatar: '',
            errors: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let dataUser = await getEditUser(id);
            if (dataUser && dataUser.user) {
                console.log(dataUser);

                let listGender = this.buildDataInputSelect([], 'GENDERS');
                let listRoles = '';
                let dataRoles = await getAllRoles();

                if (dataRoles)
                    listRoles = this.buildDataInputSelect(dataRoles.dataRoles, 'ROLES');

                let selectedGender = this.setDefaultValue(listGender, (dataUser.user.gender) ? 1 : 0);
                let selectedRoles = this.setDefaultValue(listRoles, dataUser.user.UserRoles.id)
                console.log(selectedRoles);


                this.setState({
                    listRoles,
                    listGender,
                    selectedGender,
                    selectedRoles,
                    email: dataUser.user.email,
                    userName: dataUser.user.userName,
                    fullName: dataUser.user.fullName,
                    birthday: dataUser.user.birthday,
                    imagePreviewUrl: dataUser.user.avatar,
                    id
                })
            }


        }

    }

    setDefaultValue = (inputData, value) => {
        let result = inputData.filter(item => item.value === value);
        if (result) {
            return result;
        }
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

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = async (selectedOption, name) => {
        let stateName = name.name; // Lấy tên của select - selectedOption: lấy giá trị đc chọn trên select //
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (type === 'GENDERS') {
            result = [
                { value: 1, label: 'Nam' },
                { value: 0, label: 'Nữ' },
            ];
        }
        if (inputData && inputData.length > 0) {
            if (type === 'ROLES') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.rolesName;
                    object.value = item.id;
                    result.push(object);
                })
            }

        }
        return result;
    }

    _handleImageChange = async (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result,
                    avatar: base64
                });
            }

            reader.readAsDataURL(file)
        }


    }


    checkValidateInput = () => {
        let isValid = true;
        let errors = {};
        let arrInput = ['email', 'userName', 'fullName', 'birthday', 'selectedGender', 'selectedRoles']
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
        return isValid;
    }

    handleEditUser = async () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.setState({
                isShowLoading: true
            })

            let formatedDate = new Date(this.state.birthday).getTime(); // convert timestamp //
            await this.props.editUser({
                email: this.state.email,
                password: this.state.password,
                userName: this.state.userName,
                fullName: this.state.fullName,
                birthday: formatedDate,
                gender: this.state.selectedGender,
                roles: this.state.selectedRoles,
                avatar: this.state.avatar,
                fileName: this.state.fileName,
                id: this.state.id
            });

        }

    }



    render() {

        let { email, userName, fullName,
            birthday, listGender, selectedGender,
            imagePreviewUrl, listRoles, selectedRoles } = this.state

        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Vui lòng chờ trong giây lát...'
                >
                    <div id="wrapper">
                        {/* Sidebar */}

                        <Sidebar />

                        {/* Sidebar */}
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                {/* TopBar */}
                                <Header />
                                {/* Topbar */}
                                {/* Container Fluid*/}
                                <div className="container-fluid" id="container-wrapper">
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800">Form Basics</h1>
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="./">Home</a></li>
                                            <li className="breadcrumb-item">Forms</li>
                                            <li className="breadcrumb-item active" aria-current="page">Form Basics</li>
                                        </ol>
                                    </div>
                                    <div className="row">
                                        <div className='col-3'></div>
                                        <div className="col-6">
                                            <div className="card mb-4">
                                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                    <h5 className="m-0 font-weight-bold text-primary">Edit user</h5>
                                                </div>
                                                <div className="card-body">

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                                        <input type="email" className="form-control"
                                                            value={email}
                                                            disabled
                                                            onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                                            placeholder="Enter email" />
                                                        <small id="emailHelp" className="form-text text-muted">We'll never share your
                                                            email with anyone else.</small>

                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Username</label>
                                                        <input type="text"
                                                            value={userName}
                                                            className="form-control"
                                                            readOnly
                                                            onChange={(event) => this.handleOnChangeInput(event, 'userName')}
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Username" />

                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">FullName</label>
                                                        <input type="text"
                                                            value={fullName}
                                                            className="form-control"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                                            placeholder="FullName" />
                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Birthday</label>
                                                        <DatePicker
                                                            onChange={this.handleOnChangeDatePicker}
                                                            className="form-control"
                                                            value={birthday}
                                                        />
                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Avatar</label>
                                                        <div className="custom-file">
                                                            <input type="file"
                                                                className="custom-file-input"
                                                                onChange={(e) => this._handleImageChange(e)}
                                                                id="customFile" />
                                                            <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                                        </div>
                                                        <div className="imgPreview">
                                                            {$imagePreview}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Gender</label>
                                                        <Select
                                                            value={selectedGender}
                                                            onChange={this.handleChangeSelect}
                                                            options={listGender}
                                                            placeholder='Select gender'
                                                            name='selectedGender'
                                                        />
                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Roles</label>
                                                        <Select
                                                            value={selectedRoles}
                                                            onChange={this.handleChangeSelect}
                                                            options={listRoles}
                                                            placeholder='Select Roles'
                                                            name='selectedRoles'
                                                        />
                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>



                                                    <button
                                                        type="submit"
                                                        onClick={() => this.handleEditUser()}
                                                        className="btn btn-primary btn-submit">Submit</button>

                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                                {/*-Container Fluid*/}
                            </div>
                            {/* Footer */}
                            <Footer />
                            {/* Footer */}
                        </div>
                    </div>

                </LoadingOverlay>

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
        editUser: (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
