import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Sidebar from '../../Share/Sidebar';
import Header from '../../Share/Header';
import Footer from '../../Share/Footer';
import './AddAlbum.scss';
import Select from 'react-select';
import { CommonUtils } from '../../../../utils';
import Swal from 'sweetalert2';
import * as actions from "../../../../store/actions" // import cả 3 action //
import { getAllArtists } from "../../../../services/ArtistsService";
import { getAllGenres } from '../../../../services/GenresService';
import { getAllSong, getAllSongsByArtistsGenres, getAllSongsByArtists } from '../../../../services/SongService';
import { createNewAlbum } from '../../../../services/AlbumService';

import LoadingOverlay from "react-loading-overlay";


class AddAlbum extends Component {

    constructor(props) {
        super(props);
        this.state = {
            albumName: '',
            listGenres: [],
            listArtists: [],
            listSongs: [],
            selectedGenres: '',
            selectedArtists: '',
            selectedSongs: '',
            imagePreviewUrl: '',
            image: '',
            errors: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {
        let dataArtists = await getAllArtists();
        let dataGenres = await getAllGenres();
        let dataSongs = await getAllSong();

        if (dataArtists && dataGenres && dataSongs) {
            let listArtists = this.buildDataInputSelect(dataArtists.artists, 'ARTISTS');
            let listGenres = this.buildDataInputSelect(dataGenres.genres, 'GENRES');
            let listSongs = this.buildDataInputSelect(dataSongs, 'SONGS')

            if (listArtists && listGenres && listSongs) {
                this.setState({
                    listArtists,
                    listGenres,
                    listSongs
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

        let { selectedArtists, selectedGenres } = this.state;

        if (name.name === 'selectedArtists') {
            let dataSongs = [];
            let listSongs = [];
            // Đã chọn thể loại ==> lọc bài hát thuộc ca sĩ x thuộc thể loại y //
            if (selectedGenres) {
                dataSongs = await getAllSongsByArtistsGenres(selectedArtists.value, selectedGenres.value);
                if (dataSongs)
                    listSongs = this.buildDataInputSelect(dataSongs.song, 'SONGS')

            } else { // Chưa chọn thể loại ==> lọc bài hát thuộc ca sĩ x //
                dataSongs = await getAllSongsByArtists(selectedArtists.value);
                if (dataSongs)
                    listSongs = this.buildDataInputSelect(dataSongs.song, 'SONGS')
            }
            if (listSongs) {
                this.setState({
                    listSongs
                })
            }

        } else if (name.name === 'selectedGenres') {
            let dataSongs = [];
            let listSongs = [];
            // Đã chọn ca sĩ ==> lọc bài hát thuộc ca sĩ x thuộc thể loại y //
            if (selectedArtists) {
                dataSongs = await getAllSongsByArtistsGenres(selectedArtists.value, selectedGenres.value);
                if (dataSongs)
                    listSongs = this.buildDataInputSelect(dataSongs.song, 'SONGS')
            } else {
                dataSongs = await getAllSongsByArtists(selectedArtists.value);
                if (dataSongs)
                    listSongs = this.buildDataInputSelect(dataSongs.song, 'SONGS')
            }
            if (listSongs) {
                this.setState({
                    listSongs
                })
            }

        }
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
        let arrInput = ['albumName', 'selectedGenres', 'selectedArtists', 'image']
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

    handleSaveAlbum = async () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.setState({
                isShowLoading: true
            })

            await this.props.createNewAlbum({
                albumName: this.state.albumName,
                image: this.state.image,
                fileName: this.state.fileName,
                artists: this.state.selectedArtists.value,
                genres: this.state.selectedGenres.value,
                songsData: this.state.selectedSongs
            });

            this.setState({
                albumName: '',
                selectedGenres: '',
                selectedArtists: '',
                selectedSongs: '',
                imagePreviewUrl: '',
                image: '',
                errors: {},
                isShowLoading: false,
            })
        }

    }



    render() {

        let { albumName, listGenres, selectedGenres, selectedSongs,
            imagePreviewUrl, listArtists, selectedArtists, listSongs
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
                                                    <h5 className="m-0 font-weight-bold text-primary">Add new album</h5>
                                                </div>
                                                <div className="card-body">

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Tên album</label>
                                                        <input type="text"
                                                            value={albumName}
                                                            className="form-control"
                                                            onChange={(event) => this.handleOnChangeInput(event, 'albumName')}
                                                            placeholder="Tên Album" />
                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Ca sĩ</label>
                                                        <Select
                                                            value={selectedArtists}
                                                            onChange={this.handleChangeSelect}
                                                            options={listArtists}
                                                            placeholder='Select Artists'
                                                            name='selectedArtists'
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
                                                            placeholder='Select genres'
                                                            name='selectedGenres'
                                                            styles={this.props.colourStyles}
                                                        />
                                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Bài hát</label>
                                                        <Select
                                                            value={selectedSongs}
                                                            onChange={this.handleChangeSelect}
                                                            options={listSongs}
                                                            placeholder='Select song'
                                                            name='selectedSongs'
                                                            isMulti
                                                            styles={this.props.colourStyles}
                                                        />
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
                                                        onClick={() => this.handleSaveAlbum()}
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
        createNewAlbum: (data) => dispatch(actions.createNewAlbum(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAlbum);
