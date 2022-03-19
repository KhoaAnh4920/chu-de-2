import React, { Component } from 'react';

import { connect } from 'react-redux';
import './CreatePlaylist.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Share/Header';
import Sidebar from '../Share/Sidebar';
import * as actions from "../../store/actions";
import { getRandomSongs, getSongByKeyword } from '../../services/SongService'
import { getDetailPlaylist, createNewSongInPlaylistForUser, removeSongInPlaylistForUser, deletePlaylistService } from '../../services/PlaylistService'
import { withRouter } from 'react-router';
import Tippy from '@tippyjs/react';
import { toast } from 'react-toastify';
import ModalPlayList from './ModalPlayList';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Swal from 'sweetalert2';







class CreatePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            showList: true,
            isOpenModal: false,
            userInfo: {},
            songKw: "",
            dataSearch: null,
            playlistId: '',
            visible: false,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let dataPlaylist = await getDetailPlaylist(id);
            let dataSong = await getRandomSongs(20);
            let result = dataSong.map((item, index) => {
                item.nameOfSong = "";
                item.SongOfArtists.map(x => {
                    item.nameOfSong = item.nameOfSong + x.fullName + ', ';
                })
                item.nameOfSong = item.nameOfSong.replace(/,(\s+)?$/, '');
                return item
            })

            result = result.filter(o1 => !dataPlaylist.playlist[0].SongInPlaylist.some(o2 => o1.id === o2.id));
            this.setState({
                listSongs: result,
                playlistName: dataPlaylist.playlist[0].playlistName,
                listSongsOfUser: dataPlaylist.playlist[0].SongInPlaylist,
                playlistId: id,
                dataPlaylist: dataPlaylist.playlist[0]
            })
        }
    }

    toogleBtnTippy = () => {
        if (!this.state.isLogin) {
            let visible = this.state.visible;
            this.setState({
                visible: !this.state.visible,

            })
        }
    }


    async componentDidUpdate(prevProps, prevState) {
        if (prevState.playlistId && (prevState.playlistId != +this.props.match.params.id)) {
            let id = this.props.match.params.id;
            let dataPlaylist = await getDetailPlaylist(id);
            let dataSong = await getRandomSongs(20);
            let result = dataSong.map((item, index) => {
                item.nameOfSong = "";
                item.SongOfArtists.map(x => {
                    item.nameOfSong = item.nameOfSong + x.fullName + ', ';
                })
                item.nameOfSong = item.nameOfSong.replace(/,(\s+)?$/, '');
                return item
            })

            result = result.filter(o1 => !dataPlaylist.playlist[0].SongInPlaylist.some(o2 => o1.id === o2.id));
            this.setState({
                listSongs: result,
                playlistName: dataPlaylist.playlist[0].playlistName,
                listSongsOfUser: dataPlaylist.playlist[0].SongInPlaylist,
                playlistId: id,
                dataPlaylist: dataPlaylist.playlist[0]
            })

        }
    }


    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }

    playAllPlaylist = async (listSongs) => {
        await this.props.playAllPlaylist(listSongs);
    }


    playSong = async (detailSong) => {

        let result = [];
        if (detailSong) {
            result.push(detailSong);
        }
        await this.props.playAllPlaylist(result);
    }


    handleCLickImge = () => {
        this.setState({
            isOpenModal: true
        })
    }
    handleShowHide = (status) => {
        this.setState({
            showList: !this.state.showList,
            dataSearch: null
        })
    }

    handleOnChangeInput = async (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })

        let dataSearch = await getSongByKeyword(this.state.songKw)

        if (dataSearch && dataSearch.songs) {
            let result = dataSearch.songs.map((item, index) => {
                item.nameOfSong = "";
                item.SongOfArtists.map(x => {
                    item.nameOfSong = item.nameOfSong + x.fullName + ', ';
                })
                item.nameOfSong = item.nameOfSong.replace(/,(\s+)?$/, '');
                return item
            })
            this.setState({
                dataSearch: result
            })
        }
    }


    handleAddSongInPlaylist = async (data) => {

        if (data) {
            data.playlistId = this.state.playlistId;

            let response = await createNewSongInPlaylistForUser(data);

            if (response && response.errCode == 0) {
                let dataPlaylist = await getDetailPlaylist(this.state.playlistId);
                let dataSong = await getRandomSongs(12);
                // Lọc lại nhạc //

                let result = dataSong.map((item, index) => {
                    item.nameOfSong = "";
                    item.SongOfArtists.map(x => {
                        item.nameOfSong = item.nameOfSong + x.fullName + ', ';
                    })
                    item.nameOfSong = item.nameOfSong.replace(/,(\s+)?$/, '');
                    return item
                })

                result = result.filter(o1 => !dataPlaylist.playlist[0].SongInPlaylist.some(o2 => o1.id === o2.id));

                await this.setState({
                    listSongsOfUser: dataPlaylist.playlist[0].SongInPlaylist,
                    listSongs: result,
                    dataPlaylist: dataPlaylist.playlist[0]
                })

                toast.success("Them thanh cong")
            } else {
                toast.success("Failed")
            }
        }
    }

    handleClickRemoveSong = async (data) => {
        if (data) {
            let playlistId = this.state.playlistId;

            let response = await removeSongInPlaylistForUser(playlistId, data.id);

            if (response && response.errCode == 0) {
                let dataPlaylist = await getDetailPlaylist(this.state.playlistId);
                let dataSong = await getRandomSongs(12);
                // Lọc lại nhạc //

                let result = dataSong.map((item, index) => {
                    item.nameOfSong = "";
                    item.SongOfArtists.map(x => {
                        item.nameOfSong = item.nameOfSong + x.fullName + ', ';
                    })
                    item.nameOfSong = item.nameOfSong.replace(/,(\s+)?$/, '');
                    return item
                })

                result = result.filter(o1 => !dataPlaylist.playlist[0].SongInPlaylist.some(o2 => o1.id === o2.id));

                await this.setState({
                    listSongsOfUser: dataPlaylist.playlist[0].SongInPlaylist,
                    listSongs: result,
                    dataPlaylist: dataPlaylist.playlist[0]
                })

                toast.success("Xóa thanh cong")
            } else {
                toast.success("Failed")
            }
        }
    }

    fancyTimeFormat = (duration, type) => {
        if (type === 'SONGS') {
            // Hours, minutes and seconds
            var hrs = ~~(duration / 3600);
            var mins = ~~((duration % 3600) / 60);
            var secs = ~~duration % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        } else {
            duration = Number(duration);
            var h = Math.floor(duration / 3600);
            var m = Math.floor(duration % 3600 / 60);
            var s = Math.floor(duration % 3600 % 60);

            var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            return hDisplay + mDisplay + sDisplay;
        }

    }

    saveEditPlaylist = async (data) => {


        if (data) {
            await this.props.editPlaylist({
                playlistName: data.playlistName,
                image: data.image,
                fileName: data.fileName,
                description: data.description,
                id: this.state.playlistId
            }, 'USERS');

            this.setState({
                isOpenModal: false,
                playlistName: data.playlistName,
                image: data.image,
            })
            await this.props.fetchAllPlaylistByUser(this.props.userInfo.id)
        }
    }

    handleDeletePlaylist = async (playlistId) => {
        Swal.fire({
            title: 'Bạn có muốn xóa playlist?',
            showCancelButton: true,
            confirmButtonText: 'OK',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let res = await deletePlaylistService(playlistId);


                if (res && res.errCode === 0) {
                    await this.props.fetchAllPlaylistByUser(this.props.userInfo.id);
                    toast.success('Xóa playlist thành công')
                    this.props.history.push(`/`)
                } else {
                    alert(res.errMessage)
                }
            }
        })
    }


    render() {
        let { showList, listSongs, dataSearch, songKw, playlistName, listSongsOfUser, dataPlaylist, visible, playlistId } = this.state;
        let { userInfo, isLoggedInUser } = this.props;


        return (
            <>
                <div className="wrapLikedSong">
                    <div className="list-area">
                        <Sidebar />
                        <div className="main">
                            <Header />
                            <ModalPlayList
                                isOpen={this.state.isOpenModal}
                                toggleFromParent={this.toggleUserModal}
                                dataPlaylist={dataPlaylist}
                                saveEditPlaylist={this.saveEditPlaylist}
                            />

                            <div className="wrapcontent">
                                <img className='imgLikedPage ' src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' onClick={() => { this.handleCLickImge() }}></img>
                                <div className='title-playlist '>PLAYLIST
                                    <div className='title-likedsong' onClick={() => { this.handleCLickImge() }}>{playlistName}</div>
                                    {userInfo && isLoggedInUser &&
                                        <p style={{ marginTop: '20px' }}>{userInfo.fullName}</p>
                                    }

                                </div>
                            </div>
                            <div className="like-song">
                                {listSongsOfUser && Object.keys(listSongsOfUser).length > 0 &&
                                    <div className='button-playlist' onClick={() => this.playAllPlaylist(listSongsOfUser)}><i class='fas fa-play'></i> </div>
                                }

                                <div className='button-other'>
                                    <Menu menuButton={<MenuButton className={'btn-three-dots'}>...</MenuButton>} transition>
                                        <MenuItem onClick={() => this.handleDeletePlaylist(playlistId)} className={'delete-playlist'}>Delete Playlist</MenuItem>
                                    </Menu>

                                </div>
                            </div>
                            {listSongsOfUser && listSongsOfUser.length > 0 &&
                                <>

                                    <div className='table-song-of-user' style={{ padding: '33px' }}>
                                        <table class="table table-dark table-hover" style={{ backgroundColor: '#1a1a1a', paddingLeft: '20px' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={{ borderTop: 'none' }}>#</th>
                                                    <th scope="col" style={{ borderTop: 'none' }}>Title</th>
                                                    <th scope='col' style={{ borderTop: 'none' }}><i className="fa fa-clock"></i></th>
                                                    <th scope="col" style={{ borderTop: 'none' }}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listSongsOfUser.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td scope="row" style={{ borderTop: 'none' }} onClick={() => this.playSong(item)}>{index + 1}</td>
                                                            <td className="info-song-play" style={{ borderTop: 'none' }} onClick={() => this.playSong(item)}>
                                                                <div className='content-song' style={{ display: 'flex' }}>
                                                                    <div className='img-song'>
                                                                        <img src={item.image} style={{ width: '40px', height: '40px' }} />
                                                                    </div>
                                                                    <div className='title-song' style={{ height: 'flex' }}>
                                                                        <p className="name-song" style={{ fontSize: '17px', marginBottom: '0px', marginTop: '0px', paddingLeft: '10px' }}>{item.nameSong}</p>
                                                                        <p style={{ marginBottom: '0px', paddingLeft: '10px', color: '#b3b3b3', fontSize: '13px', marginTop: '5px' }}>{item.nameArtistsForSong}</p>
                                                                    </div>
                                                                </div>
                                                            </td>


                                                            <td style={{ borderTop: 'none' }}>{this.fancyTimeFormat(item.timePlay, 'SONGS')}</td>
                                                            <td style={{ borderTop: 'none' }}>
                                                                <Tippy
                                                                    delay={200} theme='dark' trigger='click'
                                                                    placement={'bottom'} animation='perspective' offset={[40, 20]} interactive={true}
                                                                    content={
                                                                        <div style={{ minWidth: '200px', cursor: 'pointer' }}>
                                                                            <h5>Add to queue</h5>
                                                                            <h5 onClick={() => this.handleClickRemoveSong(item)}>Remove from this Libary</h5>
                                                                        </div>
                                                                    }>
                                                                    <p className="nav__text" style={{ cursor: 'pointer', fontWeight: '1000' }}> . . . </p>
                                                                </Tippy>
                                                            </td>
                                                        </tr>
                                                    )

                                                })}

                                            </tbody>
                                        </table>
                                    </div>


                                </>

                            }

                            {showList === false ?
                                <>
                                    <div className='title-searchsong '>Let's find something for your playlist</div>
                                    <input className='input-search'
                                        type='text'
                                        placeholder='Search for songs or espisodes'
                                        onChange={(event) => this.handleOnChangeInput(event, 'songKw')}
                                    />
                                    <button className='X' onClick={() => this.handleShowHide()}>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/VisualEditor_-_Icon_-_Close_-_white.svg/1200px-VisualEditor_-_Icon_-_Close_-_white.svg.png' width="40px" height="45px"></img>
                                    </button>
                                    {dataSearch &&
                                        <div className='listSong' style={{ marginTop: '30px' }}>
                                            <h3>Result For {songKw}</h3>

                                            <table id="customers" style={{ width: "100%" }}>
                                                {dataSearch.map((item, index) => {
                                                    return (
                                                        <tr key={index} >
                                                            <td style={{ width: "50px" }} onClick={() => this.playSong(item)}><img className='imgSong' src={item.image} width="50px" /></td>
                                                            <td className='nameSong' onClick={() => this.playSong(item)}> {item.nameSong} <p className='artistName'>{item.nameOfSong}</p></td>
                                                            <td className='theloai'>{item.GenresSong.genresName}</td>
                                                            <button className='addsong' onClick={() => this.handleAddSongInPlaylist(item)} >ADD</button>
                                                        </tr>
                                                    )

                                                })}


                                            </table></div>
                                    }

                                </>
                                :
                                <div className='listSong'>
                                    <h3>Recommended</h3>
                                    <button className='btnFindSong' onClick={() => this.handleShowHide()}>FIND SONGS</button>
                                    <table id="customers" style={{ width: "100%" }}>
                                        {listSongs && listSongs.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td style={{ width: "50px" }}><img className='imgSong' src={item.image} width="50px" onClick={() => this.playSong(item)} /></td>
                                                    <td className='nameSong' onClick={() => this.playSong(item)}> {item.nameSong} <p className='artistName'>{item.nameOfSong}</p></td>
                                                    <td className='theloai'>{item.GenresSong.genresName}</td>
                                                    <button className='addsong' onClick={() => this.handleAddSongInPlaylist(item)}>ADD</button>
                                                </tr>
                                            )

                                        })}

                                    </table></div>
                            }
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        isLoggedInUser: state.user.isLoggedInUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        playAllPlaylist: (detailSong) => dispatch(actions.playAllPlaylist(detailSong)),
        createNewPlaylistUser: () => dispatch(actions.createNewPlaylistUser()),
        editPlaylist: (data, type) => dispatch(actions.editPlaylist(data, type)),
        fetchAllPlaylistByUser: (id) => dispatch(actions.fetchAllPlaylistByUser(id)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist));