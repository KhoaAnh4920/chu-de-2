import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './EditArtists.scss';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { CommonUtils } from '../../../../utils';
import Swal from 'sweetalert2';
import * as actions from "../../../../store/actions" // import cả 3 action //
import LoadingOverlay from "react-loading-overlay";
import { getEditArtists, getAllCountry } from '../../../../services/ArtistsService'


class EditArtists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            listGender: [],
            listCountry: [],
            selectedGender: '',
            selectedCountry: '',
            imagePreviewUrl: '',
            image: '',
            errors: {},
            isShowLoading: false,
            description: ''
        }
    }

    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let dataArtists = await getEditArtists(id);
            if (dataArtists && dataArtists.artists) {

                let listGender = this.buildDataInputSelect([], 'GENDERS');
                let listCountry = '';
                let dataCountry = await getAllCountry();

                if (dataCountry)
                    listCountry = this.buildDataInputSelect(dataCountry.dataCountry, 'COUNTRY');

                let selectedGender = this.setDefaultValue(listGender, (dataArtists.artists.gender) ? 1 : 0);
                let selectedCountry = this.setDefaultValue(listCountry, dataArtists.artists.ArtistsCountry.keyCountry)

                this.setState({
                    listCountry,
                    listGender,
                    selectedGender,
                    selectedCountry,
                    description: dataArtists.artists.description,
                    fullName: dataArtists.artists.fullName,
                    imagePreviewUrl: dataArtists.artists.image,
                    id
                })
            }


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
            if (type === 'COUNTRY') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.nameCountry;
                    object.value = item.keyCountry;
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
                    image: base64,
                    fileName: file.name
                });
            }

            reader.readAsDataURL(file)
        }


    }


    checkValidateInput = () => {
        let isValid = true;
        let errors = {};
        let arrInput = ['fullName', 'selectedGender', 'selectedCountry']
        for (let i = 0; i < arrInput.length; i++) {
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

    handleSaveArtists = async () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.setState({
                isShowLoading: true
            })

            await this.props.editArtists({
                fullName: this.state.fullName,
                gender: this.state.selectedGender.value,
                country: this.state.selectedCountry.value,
                image: this.state.image,
                fileName: this.state.fileName,
                description: this.state.description,
                id: this.state.id
            });

            this.setState({
                fullName: '',
                selectedGender: '',
                selectedCountry: '',
                imagePreviewUrl: '',
                description: '',
                image: '',
                errors: {},
                isShowLoading: false
            })
        }

    }
    setDefaultValue = (inputData, value) => {
        let result = inputData.filter(item => item.value === value);
        if (result) {
            return result;
        }
    }



    render() {

        let { fullName, listGender, selectedGender,
            imagePreviewUrl, listCountry, selectedCountry } = this.state

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
                                                    <h5 className="m-0 font-weight-bold text-primary">Edit artists</h5>
                                                </div>
                                                <div className="card-body">

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
                                                        <label htmlFor="exampleInputEmail1">Quốc gia</label>
                                                        <Select
                                                            value={selectedCountry}
                                                            onChange={this.handleChangeSelect}
                                                            options={listCountry}
                                                            placeholder='Select Roles'
                                                            name='selectedCountry'
                                                            styles={this.props.colourStyles}
                                                        />
                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Giới tính</label>
                                                        <Select
                                                            value={selectedGender}
                                                            onChange={this.handleChangeSelect}
                                                            options={listGender}
                                                            placeholder='Select gender'
                                                            name='selectedGender'
                                                            styles={this.props.colourStyles}
                                                        />
                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Description</label>
                                                        <textarea className='form-control' style={{ 'height': '120px' }}
                                                            onChange={(event) => this.handleOnChangeInput(event, 'description')}
                                                            value={this.state.description}
                                                        >
                                                        </textarea>
                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Image</label>
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
                                                        onClick={() => this.handleSaveArtists()}
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
        editArtists: (data) => dispatch(actions.editArtists(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditArtists));
