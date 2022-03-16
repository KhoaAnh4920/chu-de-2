import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.scss';
import './DetailArtists.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Share/Header';
import Sidebar from '../Share/Sidebar';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import PlayBar from '../Share/PlayBar';
import $ from "jquery";
import imgHotHit from '../../assets/images/music/HotHit.jpg';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import FanAlsoLike from './FanAlsoLike';
import AboutArtist from './AboutArtist';
import sol7 from '../../assets/images/artist/sol7.jpg'
import * as actions from "../../store/actions";
import { getDetailArtists } from "../../services/ArtistsService"
import moment from 'moment';



class DetailArtists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            visible: false,
            listSongs: '',
            namePlaylist: '',
            image: '',
            description: '',
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

        console.log(this.props.match.params.id)

        let url = this.props.match.url

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let dataArtists = await getDetailArtists(id);
            console.log("Check dataArtists: ", dataArtists)
        }

        // if (url.indexOf("play-list") !== -1) {
        //     if (this.props.match && this.props.match.params && this.props.match.params.id) {
        //         let detailPlaylist = await getDetailPlaylist(+this.props.match.params.id)

        //         console.log("detailPlaylist: ", detailPlaylist.playlist[0].SongInPlaylist);
        //         if (detailPlaylist && detailPlaylist.playlist) {

        //             let result = detailPlaylist.playlist[0].SongInPlaylist.map(item => {
        //                 if (!isNaN(item.timePlay)) {
        //                     item.timePlay = this.fancyTimeFormat(item.timePlay, 'SONGS');
        //                 }
        //                 return item;
        //             })

        //             let playlistTimeLength = this.fancyTimeFormat(detailPlaylist.playlist[0].playlistTimeLength, 'PLAYLIST');

        //             await this.setState({
        //                 listSongs: result,
        //                 playlistId: +this.props.match.params.id,
        //                 namePlaylist: detailPlaylist.playlist[0].playlistName,
        //                 image: detailPlaylist.playlist[0].image,
        //                 description: detailPlaylist.playlist[0].description,
        //                 countSongs: Object.keys(detailPlaylist.playlist[0].SongInPlaylist).length,
        //                 playlistTimeLength: playlistTimeLength,
        //                 type: 'Playlist'
        //             })
        //         }
        //     }
        // } else {
        //     if (this.props.match && this.props.match.params && this.props.match.params.id) {
        //         let detailAlbum = await getDetailAlbum(+this.props.match.params.id)


        //         console.log("detailAlbum: ", detailAlbum);
        //         if (detailAlbum && detailAlbum.album) {

        //             let result = detailAlbum.album[0].AlbumForSongs.map(item => {
        //                 if (!isNaN(item.timePlay)) {
        //                     item.timePlay = this.fancyTimeFormat(item.timePlay, 'SONGS');
        //                 }
        //                 return item;
        //             })

        //             let albumTimeLength = this.fancyTimeFormat(detailAlbum.album[0].albumTimeLength, 'PLAYLIST');

        //             await this.setState({
        //                 listSongs: result,
        //                 playlistId: +this.props.match.params.id,
        //                 namePlaylist: detailAlbum.album[0].albumName,
        //                 image: detailAlbum.album[0].image,
        //                 description: detailAlbum.album[0].description,
        //                 countSongs: Object.keys(detailAlbum.album[0].AlbumForSongs).length,
        //                 playlistTimeLength: albumTimeLength,
        //                 type: 'Album'
        //             })


        //         }
        //     }
        // }



        console.log(this.state)
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
    toogleBtnTippy = () => {
        if (!this.state.isLogin) {
            let visible = this.state.visible;
            this.setState({
                visible: !this.state.visible,

            })
        }
    }

    playAllPlaylist = async (listSongs) => {
        console.log(listSongs);

        await this.props.playAllPlaylist(listSongs);
    }

    playSong = async (pos, listSongs) => {
        // alert(pos);
        // await this.props.playAllPlaylist([]);

        let result = listSongs.filter((item, index) => index >= pos)
        await this.props.playAllPlaylist(result);
    }


    render() {
        let visible = this.state.visible;

        let { listSongs, namePlaylist, image, description, countSongs, playlistTimeLength } = this.state

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
                                    <div className='button-like'>
                                        <NavLink activeClassName="" to="/liked-song" exact><i class='fas fa-heart'></i></NavLink>
                                    </div>
                                    <div className='button-other'>
                                        <Tippy
                                            delay={200} theme='dark' visible={visible}
                                            placement={'bottom'} animation='perspective' offset={[40, 20]} interactive={true}
                                            content={
                                                <div style={{ minWidth: '200px' }}>
                                                    <h5>Add to queue</h5>
                                                    <h5> Go to play audio</h5>
                                                    <h5>Add your Libary</h5>
                                                    <h5>Share</h5>
                                                    <h5> About</h5>
                                                    <h5> Open App</h5>
                                                </div>
                                            }>
                                            <p className="nav__text" onClick={() => this.toogleBtnTippy()}> ... </p>
                                        </Tippy>

                                    </div>
                                </div>
                                <table class="table table-dark table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Album</th>
                                            <th scope="col">Date Add</th>
                                            <th scope='col'><i className="fa fa-clock"></i></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listSongs && listSongs.map((item, index) => {
                                            return (
                                                <tr key={index} onClick={() => this.playSong(index, listSongs)}>
                                                    <th scope="row">{item.id}</th>
                                                    <td className="info-song-play">
                                                        <img src={item.image} style={{ width: '40px', height: '40px' }} />
                                                        <p className="name-song">{item.nameSong}</p>
                                                    </td>
                                                    <td>{namePlaylist}</td>
                                                    <td>{moment(item.createdAt).fromNow()}</td>
                                                    <td>{item.timePlay}</td>
                                                    <td>
                                                        <Tippy
                                                            delay={200} theme='dark' trigger='click'
                                                            placement={'bottom'} animation='perspective' offset={[40, 20]} interactive={true}
                                                            content={
                                                                <div style={{ minWidth: '200px', cursor: 'pointer' }}>
                                                                    <h5>Add to queue</h5>
                                                                    <h5> Go to play audio</h5>
                                                                    <h5>Add your Libary</h5>
                                                                    <h5>Share</h5>
                                                                    <h5> About</h5>
                                                                    <h5> Open App</h5>
                                                                </div>
                                                            }>
                                                            <p className="nav__text" style={{ cursor: 'pointer', fontWeight: '1000' }}> . . . </p>
                                                        </Tippy>
                                                    </td>
                                                </tr>
                                            )

                                        })}

                                        {/* <tr>
                                            <th scope="row">2</th>
                                            <td className="info-song-play">
                                                <img src={imgHotHit} style={{ width: '40px', height: '40px' }} />
                                                <p className="name-song">Ngày đầu tiên</p>
                                            </td>
                                            <td>Ngày đầu tiên</td>
                                            <td>6 day ago</td>
                                            <td>3:28</td>
                                            <td>
                                                <Tippy
                                                    delay={200} theme='dark' trigger='click'
                                                    placement={'bottom'} animation='perspective' offset={[40, 20]} interactive={true}
                                                    content={
                                                        <div style={{ minWidth: '200px', cursor: 'pointer' }}>
                                                            <h5>Add to queue</h5>
                                                            <h5> Go to play audio</h5>
                                                            <h5>Add your Libary</h5>
                                                            <h5>Share</h5>
                                                            <h5> About</h5>
                                                            <h5> Open App</h5>
                                                        </div>
                                                    }>
                                                    <p className="nav__text" style={{ cursor: 'pointer', fontWeight: '1000' }}> . . . </p>
                                                </Tippy>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td className="info-song-play">
                                                <img src={imgHotHit} style={{ width: '40px', height: '40px' }} />
                                                <p className="name-song">Ngày đầu tiên</p>
                                            </td>
                                            <td>Ngày đầu tiên</td>
                                            <td>6 day ago</td>
                                            <td>3:28</td>
                                            <td>
                                                <Tippy
                                                    delay={200} theme='dark' trigger='click'
                                                    placement={'bottom'} animation='perspective' offset={[40, 20]} interactive={true}
                                                    content={
                                                        <div style={{ minWidth: '200px', cursor: 'pointer' }}>
                                                            <h5>Add to queue</h5>
                                                            <h5> Go to play audio</h5>
                                                            <h5>Add your Libary</h5>
                                                            <h5>Share</h5>
                                                            <h5> About</h5>
                                                            <h5> Open App</h5>
                                                        </div>
                                                    }>
                                                    <p className="nav__text" style={{ cursor: 'pointer', fontWeight: '1000' }}> . . . </p>
                                                </Tippy>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>
                                <div className=''>
                                    SEE ALL
                                </div>
                                <hr />
                                <FanAlsoLike />
                                <hr />
                                <AboutArtist />
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPlaylist: () => dispatch(actions.fetchAllPlaylist()),
        playAllPlaylist: (listSongs) => dispatch(actions.playAllPlaylist(listSongs)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailArtists);
