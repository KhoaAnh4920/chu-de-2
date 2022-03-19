import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllSong, getAllSongsByArtistsGenres, getAllSongsByArtists, getAllSongsByGenres } from '../../../../services/SongService';
import './ModalAddSong.scss';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { getAllArtists } from '../../../../services/ArtistsService'


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
            let data = this.props.listPlaylist[0];

            let dataArtists = await getAllArtists();
            let dataSong = [];

            if (data) {
                let arr = [];
                let listGenres = [];
                if (data.genresId && data.PlaylistGenre) {
                    dataSong = await getAllSongsByGenres(data.genresId);
                    arr.push(data.PlaylistGenre);
                    listGenres = this.buildDataInputSelect(arr, 'GENRES');
                    dataSong = dataSong.song;
                } else {
                    dataSong = await getAllSong('ALL');
                    listGenres = [{ 'label': 'Tất cả', 'value': 0 }];
                }

                let listArtists = this.buildDataInputSelect(dataArtists.artists, 'ARTISTS');

                // lọc những bài chưa đc chọn //
                if (data.SongInPlaylist.length > 0) {
                    dataSong = dataSong.filter(o1 => !data.SongInPlaylist.some(o2 => o1.id === o2.id));
                    dataSong = this.buildDataInputSelect(dataSong, 'SONGS');
                }

                await this.setState({
                    selectedGenres: listGenres,
                    listArtists,
                    listSongs: dataSong
                })

            }

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

        let { type } = this.props;
        if (type === 'Playlist') {
            let dataPlaylist = this.props.listPlaylist[0];
            let { selectedArtists, selectedGenres } = this.state;

            if (name.name === 'selectedArtists') {
                let dataSongs = new Array();
                let listSongs = [];
                let result = [];
                // Đã chọn thể loại ==> lọc bài hát thuộc ca sĩ x thuộc thể loại y //

                if (selectedGenres && selectedGenres[0]) {
                    await Promise.all(selectedArtists.map(async item => {
                        let data = await getAllSongsByArtistsGenres(item.value, selectedGenres[0].value);
                        console.log("data: ", data)
                        if (data)
                            dataSongs.push(data.song);
                    }))
                }
                if (dataSongs) {
                    //listSongs = this.buildDataInputSelect(dataSongs, 'SONGS')
                    dataSongs.map(async (item, index) => {
                        await item.map(song => {

                            if (!dataPlaylist.SongInPlaylist.some(x => x.id === song.id)) {
                                let object = {};

                                object.label = song.nameSong;
                                object.value = song.id;
                                object.timePlay = song.timePlay;
                                result.push(object);
                            }
                        })

                    })
                    // Lọc bài bị trùng //
                    var uniq = {};
                    result = result.filter(obj => !uniq[obj.value] && (uniq[obj.value] = true));

                    this.setState({
                        listSongs: result
                    })

                }
            }
        }
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
        let { selectedArtists, selectedGenres, listSongs, selectedSongs, listArtists } = this.state
        let { type } = this.props;

        console.log("Type: ", type);

        console.log(listSongs);
        return (
            <>
                <Modal isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    className={'modal-add-song-container'}
                    size='lg'
                >
                    <ModalHeader toggle={() => this.toggle()}
                        className={'modal-add-song-header'}
                    >
                        Add Song
                    </ModalHeader>
                    <ModalBody className={'modal-add-song-body'}>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Ca sĩ</label>
                            <Select
                                value={selectedArtists}
                                onChange={this.handleChangeSelect}
                                options={(type === 'Albums') ? selectedArtists : listArtists}
                                placeholder='Select Artists'
                                name='selectedArtists'
                                styles={this.props.colourStyles}
                                isDisabled={(type === 'Albums') ? true : false}
                                isMulti={(type === 'Albums') ? false : true}
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
