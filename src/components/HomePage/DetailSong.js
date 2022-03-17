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
import imgHotHit from '../../assets/images/music/HotHit.jpg';
import * as actions from "../../store/actions";
import { getDetailArtists } from "../../services/ArtistsService"
import { getDetailSong, getAllSongsByArtists } from "../../services/SongService";
import moment from 'moment';
import { withRouter } from 'react-router';



class DetailSong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            visible: false,
            listSongs: '',
            nameSong: '',
            fullName: '',
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

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            console.log("DitMount run")
            let id = this.props.match.params.id;
            let dataSong = await getDetailSong(id);
            console.log("Check dataSong: ", dataSong)
            let idArtists = dataSong.song.SongOfArtists[0].id;
            let songByArtists = await getAllSongsByArtists(idArtists);

            console.log("Check songByArtists: ", songByArtists)

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

        console.log(this.state)
    }

    async componentDidUpdate(prevProps, prevState) {

        console.log(this.props.match.params.id)

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



    playSong = async (detailSong) => {
        // alert(pos);
        // await this.props.playAllPlaylist([]);

        let result = [];
        if (detailSong) {
            result.push(detailSong);
        }
        await this.props.playAllPlaylist(result);
    }

    handleDetailSong = (id) => {
        this.props.history.push(`/detail-song/${id}`)
    }


    render() {
        let visible = this.state.visible;

        // detailSong: dataSong.song,
        //         nameSong: dataSong.song.nameSong,
        //         image: dataSong.song.image,
        //         fullName: dataSong.song.SongOfArtists[0].fullName,
        //         imageArtists: dataSong.song.SongOfArtists[0].image,
        //         timePlayFull: timePlayFull,
        //         timePlayShort: timePlayShort,
        //         description: dataSong.song.description,
        //         url: dataSong.song.url

        let { nameSong, fullName, imageArtists, timePlayFull,
            timePlayShort, detailSong, url, imageSong, createdAt, id, listSongByArtists } = this.state

        console.log("Check: ", detailSong)
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
                                    <div className='button-playlist' onClick={() => this.playSong(detailSong)}><i class='fas fa-play'></i> </div>
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
                                        <tr key={id} onClick={() => this.playSong(detailSong)} >
                                            <th scope="row">{id}</th>
                                            <td className="info-song-play">
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
                                            {/* <td className="info-song-play">
                                                <img src={imageSong} style={{ width: '40px', height: '40px' }} />
                                                <p className="name-song">{nameSong}</p>
                                            </td> */}
                                            <td>{timePlayShort}</td>
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
                                        {/* {listSongs && listSongs.map((item, index) => {
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

                                        })} */}

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
                                                            <div className='button-play'><i class='fas fa-play'></i> </div>
                                                        </div>
                                                        <div className='music-name'>{item.nameSong}</div>
                                                        <div className='music-description'>{fullName}</div>
                                                    </div>
                                                )
                                            }

                                        })}


                                        {/* <div className='cart-music col-2' >
                                            <div className='music-img'>
                                                <img src={imgHotHit} />
                                                <div className='button-play'><i class='fas fa-play'></i> </div>
                                            </div>
                                            <div className='music-name'>Hot Hits Vietnam</div>
                                            <div className='music-description'>Đông với Tây, đây là những ca khúc...</div>
                                        </div>
                                        <div className='cart-music col-2' >
                                            <div className='music-img'>
                                                <img src={imgHotHit} />
                                                <div className='button-play'><i class='fas fa-play'></i> </div>
                                            </div>
                                            <div className='music-name'>Hot Hits Vietnam</div>
                                            <div className='music-description'>Đông với Tây, đây là những ca khúc...</div>
                                        </div>
                                        <div className='cart-music col-2' >
                                            <div className='music-img'>
                                                <img src={imgHotHit} />
                                                <div className='button-play'><i class='fas fa-play'></i> </div>
                                            </div>
                                            <div className='music-name'>Hot Hits Vietnam</div>
                                            <div className='music-description'>Đông với Tây, đây là những ca khúc...</div>
                                        </div> */}
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
        playAllPlaylist: (detailSong) => dispatch(actions.playAllPlaylist(detailSong)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSong));
