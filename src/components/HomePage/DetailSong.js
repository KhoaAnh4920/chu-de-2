import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.scss';
import './DetailSong.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Share/Header';
import Sidebar from '../Share/Sidebar';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import $ from "jquery";
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import * as actions from "../../store/actions";
import { getDetailArtists } from "../../services/ArtistsService"
import { getDetailSong, getAllSongsByArtists, editSongCount } from "../../services/SongService";
import { saveHistorySong } from "../../services/historySongService";
import { saveLikeSong } from "../../services/likeSongService";
import moment from 'moment';
import { manageActions } from '../../utils/constant';
import { withRouter } from 'react-router';
import { createNewSongInPlaylistForUser } from "../../services/PlaylistService"
import { toast } from 'react-toastify';




class DetailSong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            visible: false,
            clickBtnPlay: false,
            listSongs: '',
            nameSong: '',
            fullName: '',
            image: '',
            description: '',
            userId: '',
            userInfo: {},
            songId: '',
            countListen: '',
            isLike: false,
            tempMusic: {
                id: '',
                countListen: ''
            },
            tempHistoryMusic: {
                countListen: '',
                userId: '',
                songId: ''
            },
            tempLikeMusic: {
                userId: '',
                songId: ''
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



    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let dataSong = await getDetailSong(id);

            let idArtists = dataSong.song.SongOfArtists[0].id;
            let songByArtists = await getAllSongsByArtists(idArtists);



            // Loc //
            songByArtists = songByArtists.song.filter(item => item.id !== dataSong.song.id)

            let timePlayFull = this.fancyTimeFormat(dataSong.song.timePlay, 'PLAYLISTS')
            let timePlayShort = this.fancyTimeFormat(dataSong.song.timePlay, 'SONGS')
            this.setState({
                detailSong: dataSong.song,
                nameSong: dataSong.song.nameSong,
                imageSong: dataSong.song.image,
                fullName: dataSong.song.SongOfArtists[0].fullName,
                imageArtists: dataSong.song.SongOfArtists[0].image,
                timePlayFull: timePlayFull,
                timePlayShort: timePlayShort,
                description: dataSong.song.description,
                url: dataSong.song.url,
                createdAt: dataSong.song.createdAt,
                id: dataSong.song.id,
                listSongByArtists: songByArtists
            })
        }


    }

    async componentDidUpdate(prevProps, prevState) {

        if (prevState.id && (prevState.id !== +this.props.match.params.id)) {

            let id = this.props.match.params.id;
            let dataSong = await getDetailSong(id);

            let idArtists = dataSong.song.SongOfArtists[0].id;
            let songByArtists = await getAllSongsByArtists(idArtists);

            // Loc //
            songByArtists = songByArtists.song.filter(item => item.id !== dataSong.song.id)

            let timePlayFull = this.fancyTimeFormat(dataSong.song.timePlay, 'PLAYLISTS')
            let timePlayShort = this.fancyTimeFormat(dataSong.song.timePlay, 'SONGS')


            this.setState({
                detailSong: dataSong.song,
                nameSong: dataSong.song.nameSong,
                imageSong: dataSong.song.image,
                fullName: dataSong.song.SongOfArtists[0].fullName,
                imageArtists: dataSong.song.SongOfArtists[0].image,
                timePlayFull: timePlayFull,
                timePlayShort: timePlayShort,
                description: dataSong.song.description,
                url: dataSong.song.url,
                createdAt: dataSong.song.createdAt,
                id: dataSong.song.id,
                listSongByArtists: songByArtists
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



    playSong = async (detailSong) => {

        let result = [];
        if (detailSong) {
            result.push(detailSong);
        }

        let { isLoggedInUser, userInfo, listPlaylistOfUser } = this.props;

        if (userInfo) {
            this.setState({
                clickBtnPlay: true,
                countListen: this.state.countListen + 1,
                tempMusic: {
                    id: this.state.id,
                    countListen: this.state.countListen + 1
                },
                tempHistoryMusic: {
                    countListen: this.state.countListen + 1,
                    userId: this.props.userInfo.id,
                    songId: this.state.id
                },

                tempLikeMusic: {
                    userId: this.props.userInfo.id,
                    songId: this.state.id
                }
            })


            await editSongCount(this.state.tempMusic);
            await saveHistorySong(this.state.tempHistoryMusic);
        }


        await this.props.playAllPlaylist(result, 'ALL');

    }

    handleDetailSong = (id) => {
        this.props.history.push(`/detail-song/${id}`)
    }

    handleLike = async () => {
        if (this.state.clickBtnPlay === true) {

            let id = this.props.userInfo.id;
            this.setState({
                isLike: !this.state.isLike,
                tempLikeMusic: {
                    userInfoId: this.props.userInfo.id
                }
            })

            await saveLikeSong(this.state.tempLikeMusic);
            toast.success('đã thêm vào danh sách bài hát yêu thích ')
        }
        else if (this.state.clickBtnPlay === false) {
            //alert('vui lòng bấm play trước ')
            let { isLoggedInUser, userInfo, listPlaylistOfUser } = this.props;

            if (!isLoggedInUser) {
                toast.warning('Vui lòng đăng nhập ! ')
            } else {
                toast.info('Bạn chưa nghe nhạc mà đã yêu thích vội vậy sao ? Bấm play để thưởng thức trước nhé ! ')
            }

        }


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

        let { nameSong, fullName, imageArtists, timePlayFull, countListen,
            timePlayShort, detailSong, imageSong, createdAt, id, listSongByArtists } = this.state

        let { listPlaylistOfUser } = this.props

        return (
            <>
                <div className="wrap">
                    <div className="list-area">
                        <Sidebar />
                        <div className="main">
                            <Header />

                            <div className="main main-detailSong">
                                <div className='content row'>
                                    <div className='avatar col-3'>
                                        <img src={imageSong} />
                                    </div>
                                    <div className='title-song col-9'>
                                        <div>
                                            SINGLE
                                        </div>
                                        <div className="song-Name">
                                            {nameSong}
                                        </div>
                                        <div className='info-song'>
                                            {/* Duc Fuc.  SINGLE 2021 1 song, 3 min 25 sec */}
                                            <img src={imageArtists} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
                                            <span>{fullName} - </span>
                                            <span>{moment(createdAt).format('YYYY')} - </span>
                                            <span>1 songs - </span>
                                            <span>{timePlayFull}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="like-song">
                                    <div className='button-playlist' onClick={() => this.playSong(detailSong)} ><i class='fas fa-play'></i> </div>


                                    <div className={this.state.isLike === true ? 'button-activelike' : 'button-dislike'}
                                        onClick={() => this.handleLike()}
                                    >
                                        {/* <NavLink activeClassName="" to="/liked-song" exact></NavLink> */}
                                        <i class='fas fa-heart'></i>
                                    </div>


                                    {/* <div className='button-like'>
                                        <NavLink activeClassName="" to="/liked-song" exact><i class='fas fa-heart'></i></NavLink>
                                    </div> */}
                                </div>
                                <div className='table-list-song' style={{ padding: '33px' }}>
                                    <table class="table table-dark table-hover" style={{ backgroundColor: '#1a1a1a', paddingLeft: '20px' }}>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Title</th>
                                                <th scope='col'><i className="fa fa-clock"></i></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={id} style={{ borderTop: 'none' }}>
                                                <td scope="row" style={{ borderTop: 'none' }} onClick={() => this.playSong(detailSong)}>{id}</td>
                                                <td className="info-song-play" style={{ borderTop: 'none' }} onClick={() => this.playSong(detailSong)}>
                                                    <div className='content-song' style={{ display: 'flex' }}>
                                                        <div className='img-song'>
                                                            <img src={imageSong} style={{ width: '40px', height: '40px' }} />
                                                        </div>
                                                        <div className='title-song' style={{ height: 'flex' }}>
                                                            <p className="name-song" style={{ fontSize: '17px', marginBottom: '0px', marginTop: '0px', paddingLeft: '10px' }}>{nameSong}</p>
                                                            <p style={{ marginBottom: '0px', paddingLeft: '10px', color: '#b3b3b3', fontSize: '13px', marginTop: '5px' }}>{fullName}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ borderTop: 'none' }}>{timePlayShort}</td>
                                                <td style={{ borderTop: 'none' }}>
                                                    <Tippy
                                                        delay={200} theme='dark' trigger='click'
                                                        placement={'bottom'} animation='perspective' offset={[40, 20]} interactive={true}
                                                        content={
                                                            <div style={{ minWidth: '200px', cursor: 'pointer' }}>
                                                                <h5 onClick={() => this.handleAddToQueue(detailSong)}>Add to queue</h5>
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
                                                                                    <h5 key={indexPlaylist} onClick={() => this.handleClickAddSongPlaylist(detailSong, playlist.id)}>{playlist.playlistName}</h5>
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
                                        </tbody>
                                    </table>

                                </div>

                                <hr />
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>More By {fullName}</h4>
                                    </div>
                                    <div className='list-item row'>
                                        {listSongByArtists && listSongByArtists.map((item, index) => {
                                            if (index < 6) {
                                                return (
                                                    <div className='cart-music col-2' key={index} onClick={() => this.handleDetailSong(item.id)}>
                                                        <div className='music-img'>
                                                            <img src={item.image} />
                                                            <div className='button-play'><i class='fas fa-play'></i></div>
                                                        </div>
                                                        <div className='music-name'>{item.nameSong}</div>
                                                        <div className='music-description'>{fullName}</div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
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
        listPlaylistOfUser: state.user.listPlaylistOfUser,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        playAllPlaylist: (listSongs, typeSong) => dispatch(actions.playAllPlaylist(listSongs, typeSong)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSong));
