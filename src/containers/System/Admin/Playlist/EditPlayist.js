import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './EditPlaylist.scss';
import Select from 'react-select';
import { CommonUtils } from '../../../../utils';
import Swal from 'sweetalert2';
import * as actions from "../../../../store/actions" // import cả 3 action //
import { withRouter } from 'react-router-dom';
import { getEditAlbum } from '../../../../services/AlbumService';
import { getEditPlaylist } from '../../../../services/PlaylistService';
import LoadingOverlay from "react-loading-overlay";


class EditPlaylist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playlistName: '',
            listGenres: [],
            selectedGenres: '',
            selectedSongs: '',
            imagePreviewUrl: '',
            fileName: '',
            image: '',
            errors: {},
            description: '',
            isShowLoading: false
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let dataPlaylist = await getEditPlaylist(id);

            if (dataPlaylist && dataPlaylist.playlist) {
                let listGenres = [];
                if (dataPlaylist.playlist.PlaylistGenre) {
                    let arr = [];
                    arr.push(dataPlaylist.playlist.PlaylistGenre);
                    listGenres = this.buildDataInputSelect(arr, 'GENRES')
                } else {
                    listGenres = [{ 'label': 'Tất cả', 'value': 0 }];
                }

                this.setState({
                    listGenres,
                    selectedGenres: listGenres,
                    playlistName: dataPlaylist.playlist.playlistName,
                    imagePreviewUrl: dataPlaylist.playlist.image,
                    description: dataPlaylist.playlist.description,
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

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = async (selectedOption, name) => {

        let stateName = name.name; // Lấy tên của select - selectedOption: lấy giá trị đc chọn trên select //
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        await this.setState({
            ...stateCopy
        })

    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];

        if (inputData && inputData.length > 0) {
            if (type === 'ARTISTS') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.fullName;
                    object.value = item.id;
                    result.push(object);
                })
            }

            if (type === 'GENRES') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.genresName;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'SONGS') {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.nameSong;
                    object.value = item.id;
                    object.timePlay = item.timePlay;
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
        /*------------ Duck ------------*/
        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            Swal.fire({
                title: 'Missing data?',
                text: "Sai định dạng ảnh!",
                icon: 'warning',
            })
        }
        /*------------ Duck ------------*/
        else if (file) {
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
        let arrInput = ['playlistName']
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

    handleSavePlaylist = async () => {
        let isValid = this.checkValidateInput();
        if (isValid) {

            this.setState({
                isShowLoading: true
            })

            await this.props.editPlaylist({
                playlistName: this.state.playlistName,
                image: this.state.image,
                fileName: this.state.fileName,
                description: this.state.description,
                id: this.state.id
            }, 'ADMIN');

            this.setState({
                isShowLoading: false,
            })
        }

    }



    render() {

        let { playlistName, listGenres, selectedGenres,
            imagePreviewUrl, description
        } = this.state

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
                                                    <h5 className="m-0 font-weight-bold text-primary">Edit Playlist</h5>
                                                </div>
                                                <div className="card-body">

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Tên Playlist</label>
                                                        <input type="text"
                                                            value={playlistName}
                                                            className="form-control"
                                                            onChange={(event) => this.handleOnChangeInput(event, 'playlistName')}
                                                            placeholder="Tên Playlist" />
                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Thể loại</label>
                                                        <Select
                                                            value={selectedGenres}
                                                            onChange={this.handleChangeSelect}
                                                            options={listGenres}
                                                            placeholder='Select genres'
                                                            name='selectedGenres'
                                                            styles={this.props.colourStyles}
                                                            isDisabled
                                                        />
                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Description</label>
                                                        <textarea className='form-control' style={{ 'height': '120px' }}
                                                            onChange={(event) => this.handleOnChangeInput(event, 'description')}
                                                            value={description}
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
                                                        onClick={() => this.handleSavePlaylist()}
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
        editPlaylist: (data, type) => dispatch(actions.editPlaylist(data, type)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPlaylist));
