import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Share/Header';
import Sidebar from '../Share/Sidebar';
import PlayBar from '../Share/PlayBar';
import $ from "jquery";
import { getAllArtists } from '../../services/ArtistsService';
import { getAllAlbums } from '../../services/AlbumService';
import { getAllSong } from '../../services/SongService'
import { getAllPlaylist, getPlaylistByKeyword, getPlaylistByGenres } from '../../services/PlaylistService';
import * as actions from "../../store/actions";





class allProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            listArtists: [],
            listPlaylist: [],
            listAllbum: [],
            listMadeForYou: []

        }
    }

    async componentDidMount() {


        let url = this.props.match.url;

        if (url.indexOf("/all/artist") !== -1) {
            let listArtists = await getAllArtists();
            if (listArtists) {
                this.setState({
                    listArtists: listArtists.artists,
                    listPlaylist: [],
                    listAllbum: [],
                    listMadeForYou: []
                })
            }
        }
        if (url.indexOf("/all/playlist") !== -1) {

            let listPlaylist = await getAllPlaylist();

            listPlaylist = listPlaylist.playlist.filter(item => item.userId === null)

            if (listPlaylist) {
                this.setState({
                    listPlaylist: listPlaylist,
                    listArtists: [],
                    listAllbum: [],
                    listMadeForYou: []
                })
            }
        }
        if (url.indexOf("/all/made-for-you") !== -1) {

            let listMadeForYou = await getAllPlaylist();

            listMadeForYou = listMadeForYou.playlist.filter(item => item.userId === null)


            if (listMadeForYou) {
                this.setState({
                    listMadeForYou: listMadeForYou,
                    listArtists: [],
                    listAllbum: [],
                    listPlaylist: [],
                })
            }
        }
        if (url.indexOf("/all/top-mix") !== -1) {
            let listTopMix = await getPlaylistByKeyword('Mix');
            if (listTopMix) {
                this.setState({
                    listTopMix: listTopMix.playlist,
                    listArtists: [],
                    listAllbum: [],
                    listPlaylist: [],
                    listMadeForYou: []
                })
            }
        }
        if (url.indexOf("/all/us-uk") !== -1) {
            let allUsUk = await getPlaylistByGenres(6);
            if (allUsUk) {
                this.setState({
                    listUsUk: allUsUk.playlist,
                    listArtists: [],
                    listAllbum: [],
                    listPlaylist: [],
                    listMadeForYou: [],
                    listTopMix: []
                })
            }
        }
        if (url.indexOf("/all/new-song") !== -1) {
            let allnewSong = await getAllSong(10);
            if (allnewSong) {
                this.setState({
                    allnewSong: allnewSong,
                    listArtists: [],
                    listAllbum: [],
                    listPlaylist: [],
                    listMadeForYou: [],
                    listTopMix: [],
                    listUsUk: []
                })
            }
        }
        if (url.indexOf("/all/chill-playlist") !== -1) {
            let allChill = await getPlaylistByGenres(3);

            if (allChill) {
                this.setState({
                    listChill: allChill.playlist,
                    listUsUk: [],
                    listArtists: [],
                    listAllbum: [],
                    listPlaylist: [],
                    listMadeForYou: [],
                    listTopMix: [],
                    allnewSong: []
                })
            }


        }

    }

    componentDidUpdate(prevProps, prevState) {
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
    handleDetailArtists = (id) => {
        this.props.history.push(`/detail-artists/${id}`)
    }


    render() {
        let { listArtists, listPlaylist, listMadeForYou, listTopMix, listUsUk, allnewSong, listChill } = this.state;


        return (
            <>
                <div className="wrap">
                    <div className="list-area">
                        <Sidebar />
                        <div className="main">
                            <Header />

                            <div className="main__wrap">
                                <div className='list-music-container'>
                                    <div className='list-item row'>
                                        {listArtists && listArtists.map((item, index) => {
                                            return (
                                                <div className='cart-music col-2' key={index} onClick={() => this.handleDetailArtists(item.id)} >
                                                    <div className='music-img'>
                                                        <img src={item.image} />
                                                        <div className='button-play'><i class='fas fa-play'></i> </div>
                                                    </div>
                                                    <div className='music-name'>{item.fullName}</div>
                                                    <div className='music-description'>Nghệ sĩ</div>
                                                </div>
                                            )
                                        })}

                                        {listPlaylist && listPlaylist.map((item, index) => {
                                            return (
                                                <div className='cart-music col-2' onClick={() => this.handlePlaylist(item.id)} >
                                                    <div className='music-img'>
                                                        <img src={item.image} />
                                                        <div className='button-play'><i class='fas fa-play'></i> </div>
                                                    </div>
                                                    <div className='music-name'>{item.playlistName}</div>
                                                    <div className='music-description'>{item.description}</div>
                                                </div>
                                            )
                                        })}

                                        {listMadeForYou && listMadeForYou.map((item, index) => {
                                            return (
                                                <div className='cart-music col-2' onClick={() => this.handlePlaylist(item.id)} key={index} >
                                                    <div className='music-img'>
                                                        <img src={item.image} />
                                                        <div className='button-play'><i class='fas fa-play'></i> </div>
                                                    </div>
                                                    <div className='music-name'>{item.playlistName}</div>
                                                    <div className='music-description'>{item.description}</div>
                                                </div>
                                            )
                                        })}

                                        {listTopMix && listTopMix.map((item, index) => {
                                            return (
                                                <div className='cart-music col-2' onClick={() => this.handlePlaylist(item.id)} key={index}>
                                                    <div className='music-img'>
                                                        <img src={item.image} />
                                                        <div className='button-play'><i class='fas fa-play'></i> </div>
                                                    </div>
                                                    <div className='music-name'>{item.playlistName}</div>
                                                    <div className='music-description'>{item.description}</div>
                                                </div>
                                            )

                                        })}

                                        {listUsUk && listUsUk.map((item, index) => {
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
                                        })}

                                        {allnewSong && allnewSong.map((item, index) => {

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

                                        })}

                                        {listChill && listChill.map((item, index) => {

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
                                        })}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(allProduct);
