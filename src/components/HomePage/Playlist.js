import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.scss';
import './Playlist.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Share/Header';
import Sidebar from '../Share/Sidebar';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import * as actions from "../../store/actions";
import { getDetailPlaylist, createNewSongInPlaylistForUser } from "../../services/PlaylistService"
import { getDetailAlbum } from "../../services/AlbumService"
import { toast } from 'react-toastify';
import moment from 'moment';



class Playlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            visible: false,
            isOpenModal: false
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



    async componentDidMount() {

        let { isLoggedInUser, userInfo } = this.props;

        let url = this.props.match.url

        if (url.indexOf("play-list") !== -1) {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                let detailPlaylist = await getDetailPlaylist(+this.props.match.params.id)

                if (detailPlaylist && detailPlaylist.playlist) {

                    let result = detailPlaylist.playlist[0].SongInPlaylist.map(item => {
                        if (!isNaN(item.timePlay)) {
                            item.timePlay = this.fancyTimeFormat(item.timePlay, 'SONGS');
                        }
                        item.nameForSong = "";
                        item.SongOfArtists.map((x, y) => {
                            item.nameForSong = item.nameForSong + x.fullName + ', ';
                        })
                        item.nameForSong = item.nameForSong.replace(/,(\s+)?$/, '');
                        return item;
                    })

                    let playlistTimeLength = this.fancyTimeFormat(detailPlaylist.playlist[0].playlistTimeLength, 'PLAYLIST');

                    await this.setState({
                        listSongs: result,
                        playlistId: +this.props.match.params.id,
                        namePlaylist: detailPlaylist.playlist[0].playlistName,
                        image: detailPlaylist.playlist[0].image,
                        description: detailPlaylist.playlist[0].description,
                        countSongs: Object.keys(detailPlaylist.playlist[0].SongInPlaylist).length,
                        playlistTimeLength: playlistTimeLength,
                        type: 'Playlist',
                    })
                }
            }
        } else {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                let detailAlbum = await getDetailAlbum(+this.props.match.params.id)

                if (detailAlbum && detailAlbum.album) {

                    let result = detailAlbum.album[0].AlbumForSongs.map(item => {
                        if (!isNaN(item.timePlay)) {
                            item.timePlay = this.fancyTimeFormat(item.timePlay, 'SONGS');
                        }

                        item.nameForSong = "";
                        item.SongOfArtists.map((x, y) => {
                            item.nameForSong = item.nameForSong + x.fullName + ', ';
                        })
                        item.nameForSong = item.nameForSong.replace(/,(\s+)?$/, '');
                        return item;
                    })

                    let albumTimeLength = this.fancyTimeFormat(detailAlbum.album[0].albumTimeLength, 'PLAYLIST');

                    await this.setState({
                        listSongs: result,
                        playlistId: +this.props.match.params.id,
                        namePlaylist: detailAlbum.album[0].albumName,
                        image: detailAlbum.album[0].image,
                        description: detailAlbum.album[0].description,
                        countSongs: Object.keys(detailAlbum.album[0].AlbumForSongs).length,
                        playlistTimeLength: albumTimeLength,
                        type: 'Album',
                    })
                }
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
    }

    toogleBtnTippy = () => {
        if (!this.state.isLogin) {
            let visible = this.state.visible;
            this.setState({
                visible: !this.state.visible,

            })
        }
    }

    playAllPlaylist = async (listSongs) => {
        await this.props.playAllPlaylist(listSongs, 'ALL');
    }

    playSong = async (pos, listSongs) => {
        let result = listSongs.filter((item, index) => index >= pos)
        await this.props.playAllPlaylist(result, 'ALL');
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }

    handleClickAddSongPlaylist = async (dataSong, idPlaylist) => {

        if (dataSong && idPlaylist) {
            dataSong.playlistId = idPlaylist;

            let response = await createNewSongInPlaylistForUser(dataSong);
            if (response && response.errCode == 0) {
                toast.success("Them thanh cong")
            } else {
                toast.success("Failed")
            }
        }
    }

    handleAddToQueue = async (detailSong) => {


        let result = [];
        if (detailSong) {
            result.push(detailSong);
        }
        await this.props.playAllPlaylist(result, 'QUEUE');
    }

    render() {
        let visible = this.state.visible;

        let { listSongs, namePlaylist, image, description, countSongs, playlistTimeLength } = this.state
        let { listPlaylistOfUser } = this.props

        console.log("Render: ", listPlaylistOfUser)
        return (
            <>
                <div className="wrap">
                    <div className="list-area">
                        <Sidebar />
                        <div className="main">
                            <Header />

                            <div className="main main-playlist">
                                <div className='content row'>
                                    <div className='avatar col-3'>
                                        <img src={image} />
                                    </div>
                                    <div className='title-playlist col-9'>
                                        <div>
                                            Playlist
                                        </div>
                                        <div className="song-Name">
                                            {namePlaylist}
                                        </div>
                                        <div>
                                            {/* Duc Fuc.  SINGLE 2021 1 song, 3 min 25 sec */}
                                            <p>{description}</p>
                                            <p>{countSongs} songs, {playlistTimeLength} </p>
                                        </div>
                                    </div>

                                </div>
                                <div className="like-song">
                                    <div className='button-playlist' onClick={() => this.playAllPlaylist(listSongs)}><i class='fas fa-play'></i> </div>
                                </div>
                                <div className='table-list-song' style={{ padding: '33px' }}>
                                    <table class="table table-dark table-hover" style={{ backgroundColor: '#1a1a1a', paddingLeft: '20px' }}>
                                        <thead >
                                            <tr>
                                                <th scope="col" style={{ borderTop: 'none' }}>#</th>
                                                <th scope="col" style={{ borderTop: 'none' }}>Title</th>
                                                <th scope="col" style={{ borderTop: 'none' }}>Album</th>
                                                <th scope="col" style={{ borderTop: 'none' }}>Date Add</th>
                                                <th scope='col' style={{ borderTop: 'none' }}><i className="fa fa-clock"></i></th>
                                                <th scope="col" style={{ borderTop: 'none' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listSongs && listSongs.map((item, index) => {
                                                return (
                                                    <tr key={index} style={{ borderTop: 'none' }}>
                                                        <td scope="row" style={{ borderTop: 'none' }} onClick={() => this.playSong(index, listSongs)}>{index + 1}</td>
                                                        <td className="info-song-play" style={{ borderTop: 'none' }} onClick={() => this.playSong(index, listSongs)}>
                                                            <div className='content-song' style={{ display: 'flex' }}>
                                                                <div className='img-song'>
                                                                    <img src={item.image} style={{ width: '40px', height: '40px' }} />
                                                                </div>
                                                                <div className='title-song' style={{ height: 'flex' }}>
                                                                    <p className="name-song" style={{ fontSize: '17px', marginBottom: '0px', marginTop: '0px', paddingLeft: '10px' }}>{item.nameSong}</p>
                                                                    <p style={{ marginBottom: '0px', paddingLeft: '10px', color: '#b3b3b3', fontSize: '13px', marginTop: '5px' }}>{item.nameForSong}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style={{ borderTop: 'none' }}>{namePlaylist}</td>
                                                        <td style={{ borderTop: 'none' }}>{moment(item.createdAt).fromNow()}</td>
                                                        <td style={{ borderTop: 'none' }}>{item.timePlay}</td>
                                                        <td style={{ borderTop: 'none' }}>
                                                            <Tippy
                                                                delay={200} theme='dark' trigger='click'
                                                                placement={'bottom'} animation='perspective' offset={[40, 20]} interactive={true}
                                                                content={
                                                                    <div style={{ minWidth: '200px', cursor: 'pointer', paddingLeft: '10px' }}>
                                                                        <h5 style={{ paddingLeft: '10px' }} onClick={() => this.handleAddToQueue(item)}>Add to queue</h5>

                                                                        <div className="btn-group dropleft">
                                                                            <h5 type="button" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                Add your Libary
                                                                            </h5>
                                                                            <div className="dropdown-menu" style={{ backgroundColor: '#333', color: '#fff', padding: '10px', width: '200px' }}>
                                                                                {/* Dropdown menu links */}
                                                                                <h5 style={{ borderBottom: '1px solid #5c5c5c' }}>Create New Playlist</h5>
                                                                                {listPlaylistOfUser && listPlaylistOfUser.map((playlist, indexPlaylist) => {
                                                                                    return (
                                                                                        <>
                                                                                            <h5 key={indexPlaylist} onClick={() => this.handleClickAddSongPlaylist(item, playlist.id)}>{playlist.playlistName}</h5>
                                                                                        </>
                                                                                    )
                                                                                })}

                                                                            </div>
                                                                        </div>

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

                            </div>
                        </div>
                    </div >
                </div >

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedInUser: state.user.isLoggedInUser,
        listPlaylist: state.admin.listPlaylist,
        userInfo: state.user.userInfo,
        listPlaylistOfUser: state.user.listPlaylistOfUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPlaylist: () => dispatch(actions.fetchAllPlaylist()),
        playAllPlaylist: (listSongs, typeSong) => dispatch(actions.playAllPlaylist(listSongs, typeSong)),
        fetchAllPlaylistByUser: (id) => dispatch(actions.fetchAllPlaylistByUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
