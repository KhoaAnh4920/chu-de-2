import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './AddGenres.scss';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import { CommonUtils } from '../../../../utils';
import Swal from 'sweetalert2'


class AddGenres extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameGenres: '',
            image: '',
            errors: {},
        }
    }

    componentDidMount() {

        let listGender = this.buildDataInputSelect([], 'GENDERS');
        console.log(listGender);
        this.setState({
            listGender
        })
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
                    image: base64
                });
            }

            reader.readAsDataURL(file)
        }


    }


    checkValidateInput = () => {
        let isValid = true;
        let errors = {};
        let arrInput = ['nameGenres', 'selectedGender']
        for (let i = 0; i < arrInput.length; i++) {
            // this.state[arrInput[i]] == this.state.email or this.state.password
            if (!this.state[arrInput[i]]) {
                isValid = false;
                errors[arrInput[i]] = "Cannot be empty";
            }
        }

        Swal.fire({
            title: 'Missing data?',
            text: "Vui lòng điền đầy đủ thông tin!",
            icon: 'warning',
        })

        this.setState({ errors: errors });

        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            //this.props.addNewUser(this.state);
        }

    }



    render() {

        let { nameGenres, imagePreviewUrl } = this.state

        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <>
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
                                                <h5 className="m-0 font-weight-bold text-primary">Add new Genres</h5>
                                            </div>
                                            <div className="card-body">


                                                <div className="form-group">
                                                    <label htmlFor="exampleInputGenres">Thể loại nhạc</label>
                                                    <input type="text"
                                                        value={nameGenres}
                                                        className="form-control"
                                                        onChange={(event) => this.handleOnChangeInput(event, 'nameGenres')}
                                                        placeholder="Genres" />
                                                    <span style={{ color: "red" }}>{this.state.errors["nameGenres"]}</span>

                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputImage">Image</label>
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




                                                <button
                                                    type="submit"
                                                    onClick={() => this.handleSaveUser()}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGenres);
