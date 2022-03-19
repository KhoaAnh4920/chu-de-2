import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.scss';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Share/Header';
import Sidebar from '../Share/Sidebar';
import { withRouter } from 'react-router';
import PlayBar from '../Share/PlayBar';
import $ from "jquery";
import imgHotHit from '../../assets/images/music/HotHit.jpg';
import * as actions from "../../store/actions";
import FanAlsoLike from './FanAlsoLike';
import { getAllAlbums } from '../../services/AlbumService';
import { getAllSong } from '../../services/SongService';
import { getAllPlaylist, getRandomPlaylist, getPlaylistByKeyword, getPlaylistByGenres } from '../../services/PlaylistService';
import { getAllArtists } from '../../services/ArtistsService';
import { saveHistorySong, getHistorySong } from "../../services/historySongService";


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            listPlaylist: [],
            listAlbums: [],
            listMadeForYou: [],
            userInfo: {},
            listPlaylistOfUser: [],
            listHistoryMusic: []
        }
    }

    async componentDidMount() {
        let { isLoggedInUser, userInfo, listPlaylistOfUser } = this.props;

        let allPlaylist = await getAllPlaylist();
        let allAlums = await getAllAlbums();
        let allArtists = await getAllArtists();
        let allMadeForYou = await getRandomPlaylist();
        let allTopMix = await getPlaylistByKeyword('Mix');
        let allUsUk = await getPlaylistByGenres(6);
        let newSongs = await getAllSong('ALL');
        let allChill = await getPlaylistByGenres(3);



        let result = allPlaylist.playlist.filter(item => item.userId === null)

        if (allAlums && allPlaylist && allArtists && allMadeForYou) {
            this.setState({
                listAlbums: allAlums.albums,
                listPlaylist: result,
                listArtists: allArtists.artists,
                listMadeForYou: allMadeForYou.playlist,
                listTopMix: allTopMix.playlist,
                listUsUk: allUsUk.playlist,
                newSongs: newSongs,
                listChill: allChill.playlist,

            })
        }

        if (userInfo) {
            await this.props.fetchAllPlaylistByUser(userInfo.id)

            // Doi //
            let historyMusic = await getHistorySong(this.props.userInfo.id);
            var uniq = {};
            historyMusic = historyMusic.filter(obj => !uniq[obj.songId] && (uniq[obj.songId] = true));
            // Doi //


            await this.setState({
                isLogin: isLoggedInUser,
                userInfo,
                listPlaylistOfUser,
                listHistoryMusic: historyMusic
            })
        }


    }

    async componentDidUpdate(prevProps, prevState) {
    }


    handleKeoTha = (e) => {
        var min = e.target.min,
            max = e.target.max,
            val = e.target.value;


        $(e.target).css({
            'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
        });


    }
    handlePlaylist = (id) => {
        this.props.history.push(`/play-list/${id}`)
    }

    handleAlbum = (id) => {
        this.props.history.push(`/album/${id}`)
    }
    handleDetailSong = (id) => {
        this.props.history.push(`/detail-song/${id}`)
    }


    render() {


        let { listAlbums, listPlaylist, listArtists,
            listMadeForYou, listTopMix, listUsUk, newSongs, listChill, listHistoryMusic } = this.state

        return (
            <>

                <div className="wrap">
                    <div className="list-area">
                        <Sidebar />
                        <div className="main">
                            <Header />

                            <div className="main__wrap">
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>Lựa chọn của Spotifake</h4>
                                        <NavLink activeClassName="active1" to="/all/playlist" exact>SEE ALL</NavLink>
                                    </div>
                                    <div className='list-item row'>
                                        {listPlaylist.map((item, index) => {
                                            if (index < 6) {
                                                return (
                                                    <div className='cart-music col-2' onClick={() => this.handlePlaylist(item.id)} key={index}>
                                                        <div className='music-img'>
                                                            <img src={item.image} />
                                                            <div className='button-play'
                                                                onClick={() => this.handlePlaylist(item.id)}
                                                            ><i class='fas fa-play'></i> </div>
                                                        </div>
                                                        <div className='music-name'>{item.playlistName}</div>
                                                        <div className='music-description'>{item.description}</div>
                                                    </div>
                                                )
                                            }
                                        })}

                                    </div>
                                </div>
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>Albums hot</h4>
                                    </div>
                                    <div className='list-item row'>

                                        {listAlbums.map((item, index) => {
                                            if (index < 6) {
                                                return (
                                                    <div className='cart-music col-2' key={index} onClick={() => this.handleAlbum(item.id)}>
                                                        <div className='music-img'>
                                                            <img src={item.image} />
                                                            <div className='button-play'><i class='fas fa-play'></i> </div>
                                                        </div>
                                                        <div className='music-name'>{item.albumName}</div>
                                                        <div className='music-description'>{item.description}</div>
                                                    </div>
                                                )
                                            }

                                        })}

                                    </div>
                                </div>
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>Made for you</h4>
                                        <NavLink activeClassName="active1" to="/all/made-for-you" exact>SEE ALL</NavLink>
                                    </div>
                                    <div className='list-item row'>
                                        {listMadeForYou && listMadeForYou.map((item, index) => {
                                            if (index < 6) {
                                                return (
                                                    <div className='cart-music col-2' key={index} onClick={() => this.handlePlaylist(item.id)} >
                                                        <div className='music-img'>
                                                            <img src={item.image} />
                                                            <div className='button-play'><i class='fas fa-play'></i> </div>
                                                        </div>
                                                        <div className='music-name'>{item.playlistName}</div>
                                                        <div className='music-description'>{item.description}</div>
                                                    </div>
                                                )
                                            }


                                        })}



                                    </div>
                                </div>
                                {listHistoryMusic && Object.keys(listHistoryMusic).length > 0
                                    &&
                                    <div className='list-music-container'>
                                        <div className='title-list'>
                                            <h4>Recently played</h4>
                                        </div>
                                        <div className='list-item row'>
                                            {listHistoryMusic.slice(0, 6).map((item, index) => {
                                                if (index >= 0) {
                                                    return (
                                                        <div className='cart-music col-2'
                                                            onClick={() => this.handleDetailSong(item.SongHistory.id)}
                                                        >
                                                            <div className='music-img'>
                                                                <img src={item.SongHistory.image} />
                                                                <div className='button-play'><i class='fas fa-play'></i> </div>
                                                            </div>
                                                            <div className='music-name'>{item.SongHistory.nameSong}</div>
                                                            <div className='music-description'>{item.SongHistory.description}</div>
                                                        </div>
                                                    )
                                                }
                                            })}

                                        </div>
                                    </div>
                                }




                                {/* Your Top Mix */}
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>Your Top Mix</h4>
                                        <NavLink activeClassName="active1" to="/all/top-mix" exact>SEE ALL</NavLink>
                                    </div>
                                    <div className='list-item row'>
                                        {listTopMix && listTopMix.map((item, index) => {
                                            if (index < 6) {
                                                return (
                                                    <div className='cart-music col-2' key={index} onClick={() => this.handlePlaylist(item.id)}>
                                                        <div className='music-img'>
                                                            <img src={item.image} />
                                                            <div className='button-play'><i class='fas fa-play'></i> </div>
                                                        </div>
                                                        <div className='music-name'>{item.playlistName}</div>
                                                        <div className='music-description'>{item.description}</div>
                                                    </div>
                                                )
                                            }
                                        })}

                                    </div>
                                </div>

                                {/* Âu Mỹ Nổi Bật */}
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>Âu Mỹ Nổi Bật</h4>
                                        <NavLink activeClassName="active1" to="/all/us-uk" exact>SEE ALL</NavLink>
                                    </div>
                                    <div className='list-item row'>
                                        {listUsUk && listUsUk.map((item, index) => {
                                            if (index < 6) {
                                                return (
                                                    <div className='cart-music col-2' key={index} onClick={() => this.handlePlaylist(item.id)} >
                                                        <div className='music-img'>
                                                            <img src={item.image} />
                                                            <div className='button-play'><i class='fas fa-play'></i> </div>
                                                        </div>
                                                        <div className='music-name'>{item.playlistName}</div>
                                                        <div className='music-description'>{item.description}</div>
                                                    </div>
                                                )
                                            }
                                        })}


                                    </div>
                                </div>

                                {/* Bài Hát Mới Nhất */}
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>Bài Hát Mới Nhất</h4>
                                        <NavLink activeClassName="active1" to="/all/new-song" exact>SEE ALL</NavLink>
                                    </div>
                                    <div className='list-item row'>
                                        {newSongs && newSongs.map((item, index) => {
                                            if (index < 6) {
                                                return (
                                                    <div className='cart-music col-2' key={index} onClick={() => this.handleDetailSong(item.id)} >
                                                        <div className='music-img'>
                                                            <img src={item.image} />
                                                            <div className='button-play'><i class='fas fa-play'></i> </div>
                                                        </div>
                                                        <div className='music-name'>{item.nameSong}</div>
                                                        <div className='music-description'>{item.SongOfArtists[0].fullName}</div>
                                                    </div>
                                                )

                                            }

                                        })}

                                    </div>
                                </div>

                                {/* Chill */}
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>Chill</h4>
                                        <NavLink activeClassName="active1" to="/all/chill-playlist" exact>SEE ALL</NavLink>
                                    </div>
                                    <div className='list-item row'>
                                        {listChill && listChill.map((item, index) => {
                                            if (index < 6) {
                                                return (
                                                    <div className='cart-music col-2' key={index} onClick={() => this.handlePlaylist(item.id)}>
                                                        <div className='music-img'>
                                                            <img src={item.image} />
                                                            <div className='button-play'><i class='fas fa-play'></i> </div>
                                                        </div>
                                                        <div className='music-name'>{item.playlistName}</div>
                                                        <div className='music-description'>{item.description}</div>
                                                    </div>
                                                )
                                            }
                                        })}


                                    </div>
                                </div>

                                {/* ARTISTS */}
                                <FanAlsoLike listArtists={listArtists} />
                            </div>
                        </div>
                    </div>
                    {/* PlayBar */}
                    {/* < PlayBar /> */}
                </div>

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedInUser: state.user.isLoggedInUser,
        listPlaylist: state.admin.listPlaylist,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPlaylist: () => dispatch(actions.fetchAllPlaylist()),
        fetchAllPlaylistByUser: (id) => dispatch(actions.fetchAllPlaylistByUser(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
