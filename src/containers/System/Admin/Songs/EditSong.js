import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './EditSong.scss';
import { CommonUtils } from '../../../../utils';
import Swal from 'sweetalert2'
import LoadingOverlay from "react-loading-overlay";
import * as actions from "../../../../store/actions" // import cả 3 action //
import Select from 'react-select';
import { getAllArtists } from '../../../../services/ArtistsService';
import { getAllGenres } from '../../../../services/GenresService';
import { getEditSong } from "../../../../services/SongService"


class EditSong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameSong: '',
            lyrics: '',
            description: '',
            image: '',
            errors: {},
            fileNameImage: '',
            fileNameSong: '',
            fileSong: '',
            selectedArtists: '',
            selectedGenres: '',
            isShowLoading: false,
            file: '',
            imagePreviewUrl: '',
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let dataSong = await getEditSong(id);

            console.log(dataSong);
            if (dataSong && dataSong.song) {
                let dataArtists = await getAllArtists();
                let dataGenres = await getAllGenres();

                if (dataArtists && dataGenres) {
                    let listArtists = this.buildDataInputSelect(dataArtists.artists, 'ARTISTS');
                    let listGenres = this.buildDataInputSelect(dataGenres.genres, 'GENRES');

                    let selectedArtists = this.setDefaultValue(listArtists, dataSong.song.SongOfArtists, 'ARTISTS');
                    let selectedGenres = this.setDefaultValue(listGenres, dataSong.song.genresId, 'GENRES');

                    if (listArtists && listGenres) {
                        this.setState({
                            listArtists,
                            listGenres,
                            selectedArtists,
                            selectedGenres,
                            nameSong: dataSong.song.nameSong,
                            description: dataSong.song.description,
                            imagePreviewUrl: dataSong.song.image,
                            lyrics: dataSong.song.lyrics,
                            id: id
                        })
                    }
                    var sound = document.getElementById('sound');
                    sound.src = dataSong.song.url;
                    sound.controls = true;
                }
            }
        }


    }

    setDefaultValue = (inputData, value, type) => {
        let result = {};
        if (type === 'ARTISTS') {
            result = inputData.filter(o1 => value.some(o2 => o1.value === o2.id));
        } else {
            result = inputData.filter(item => item.value === value);
        }

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
                    fileNameImage: file.name
                });
            }

            reader.readAsDataURL(file)
        }


    }

    handleChangeSong = async (e) => {
        e.preventDefault();

        var sound = document.getElementById('sound');

        let reader = new FileReader();
        let file = e.target.files[0];

        if (file) {

            reader.onloadend = () => {
                sound.src = URL.createObjectURL(file);
                sound.controls = true;
                this.setState({
                    fileSong: file,
                    fileNameSong: file.name
                });
            }

            reader.readAsDataURL(file)
        }
    }


    checkValidateInput = () => {
        let isValid = true;
        let errors = {};
        let arrInput = ['nameSong']
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

    handleSaveSong = async () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.setState({
                isShowLoading: true
            })

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            const formData = new FormData();

            console.log(this.state)

            formData.append('nameSong', this.state.nameSong);
            formData.append('id', this.state.id);
            formData.append('lyrics', this.state.lyrics);
            formData.append('description', this.state.description);
            formData.append('image', this.state.image);
            formData.append('fileNameImage', this.state.fileNameImage);
            formData.append('fileNameSong', this.state.fileNameSong);
            formData.append('fileSong', this.state.fileSong);
            formData.append('artists', JSON.stringify(this.state.selectedArtists));
            formData.append('genres', JSON.stringify(this.state.selectedGenres[0].value));

            await this.props.editSong(formData, config);

            this.setState({

                isShowLoading: false,
            })
        }

    }



    render() {

        let { nameSong, imagePreviewUrl, selectedGenres, selectedArtists, listArtists, listGenres } = this.state

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
                                                    <h5 className="m-0 font-weight-bold text-primary">Add new Song</h5>
                                                </div>
                                                <div className="card-body">


                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputGenres">Tên bài hát</label>
                                                        <input type="text"
                                                            value={nameSong}
                                                            className="form-control"
                                                            onChange={(event) => this.handleOnChangeInput(event, 'nameSong')}
                                                            placeholder="Tên bài hát" />
                                                        <span style={{ color: "red" }}>{this.state.errors["nameSong"]}</span>

                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputGenres">Lyrics</label>

                                                        <textarea className='form-control' style={{ 'height': '100px' }}
                                                            onChange={(event) => this.handleOnChangeInput(event, 'lyrics')}
                                                            value={this.state.lyrics}
                                                        >
                                                        </textarea>
                                                        <span style={{ color: "red" }}>{this.state.errors["lyrics"]}</span>

                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Ca sĩ</label>
                                                        <Select

                                                            value={selectedArtists}
                                                            onChange={this.handleChangeSelect}
                                                            options={listArtists}
                                                            placeholder='Select Artists'
                                                            name='selectedArtists'
                                                            isMulti
                                                            styles={this.props.colourStyles}

                                                        />
                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Thể loại</label>
                                                        <Select

                                                            value={selectedGenres}
                                                            onChange={this.handleChangeSelect}
                                                            options={listGenres}
                                                            placeholder='Select Genres'
                                                            name='selectedGenres'
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
                                                        <label htmlFor="exampleInputImage">File</label>
                                                        <div className="custom-file">
                                                            <input type="file"
                                                                className="custom-file-input"
                                                                onChange={(e) => this.handleChangeSong(e)}
                                                                id="customFile" />
                                                            <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                                        </div>

                                                        <div className='previewAudio' style={{ marginTop: '10px' }}>
                                                            <audio id="sound" controls></audio>
                                                        </div>
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
                                                        onClick={() => this.handleSaveSong()}
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
        editSong: (data) => dispatch(actions.editSong(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditSong));
