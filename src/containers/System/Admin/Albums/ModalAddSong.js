import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllSong, getAllSongsByArtistsGenres, getAllSongsByArtists } from '../../../../services/SongService';
import './ModalAddSong.scss';
import Select from 'react-select';
import Swal from 'sweetalert2';



class ModalAddSong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listGenres: [],
            listArtists: [],
            listSongs: [],
            selectedGenres: '',
            selectedArtists: '',
            selectedSongs: '',
        }
    }

    async componentDidMount() {

        if (this.props.type === 'Albums') {
            let data = this.props.listAlbums[0];

            if (data.AlbumOfArtists && data.AlbumGenre) {
                let arr = [];
                arr.push(data.AlbumGenre);
                let listArtists = this.buildDataInputSelect(data.AlbumOfArtists, 'ARTISTS');
                let listGenres = this.buildDataInputSelect(arr, 'GENRES');

                let listSongs = await getAllSongsByArtistsGenres(listArtists[0].value, listGenres[0].value)

                console.log("Truoc khi loc 1: ", data.AlbumForSongs);
                console.log("Truoc khi loc 2: ", listSongs.song);
                // lọc những bài chưa đc chọn //

                if (data.AlbumForSongs.length > 0) {
                    listSongs = listSongs.song.filter(o1 => !data.AlbumForSongs.some(o2 => o1.id === o2.id));
                }

                listSongs = this.buildDataInputSelect(listSongs, 'SONGS');

                await this.setState({
                    selectedArtists: listArtists,
                    selectedGenres: listGenres,
                    listSongs: listSongs
                })
            }
        } else {
            console.log('Playlist')
        }



    }

    componentDidUpdate(prevProps, prevState) {
    }

    toggle = () => {
        this.props.toggleFromParent();
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


    handleChangeSelect = async (selectedOption, name) => {

        let stateName = name.name; // Lấy tên của select - selectedOption: lấy giá trị đc chọn trên select //
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        await this.setState({
            ...stateCopy
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let errors = {};
        let arrInput = ['selectedSongs']
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

    handleAddNewSong = () => {

        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewSong(this.state);
        }

    }


    render() {
        let { selectedArtists, selectedGenres, listSongs, selectedSongs } = this.state

        console.log(listSongs);
        return (
            <>
                <Modal isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    className={'modal-user-container'}
                    size='lg'
                >
                    <ModalHeader toggle={() => this.toggle()}>
                        Add Song
                    </ModalHeader>
                    <ModalBody>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Ca sĩ</label>
                            <Select
                                value={selectedArtists}
                                onChange={this.handleChangeSelect}
                                options={selectedArtists}
                                placeholder='Select Artists'
                                name='selectedArtists'
                                isDisabled
                                styles={this.props.colourStyles}
                            />


                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Thể loại</label>
                            <Select
                                value={selectedGenres}
                                onChange={this.handleChangeSelect}
                                options={selectedGenres}
                                placeholder='Select Genres'
                                name='selectedGenres'
                                isDisabled
                                styles={this.props.colourStyles}
                            />

                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Bài hát</label>
                            <Select
                                value={selectedSongs}
                                onChange={this.handleChangeSelect}
                                options={listSongs}
                                placeholder='Select Song'
                                name='selectedSongs'
                                isMulti
                                styles={this.props.colourStyles}
                            />


                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.handleAddNewSong()}
                            className='px-3'
                        >
                            Save
                        </Button>
                        {' '}
                        <Button className='px-3' onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddSong);
