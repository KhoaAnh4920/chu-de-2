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
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import FanAlsoLike from './FanAlsoLike';
import AboutArtist from './AboutArtist';
import * as actions from "../../store/actions";
import { getDetailArtists, getAllArtists } from "../../services/ArtistsService"
import { createNewSongInPlaylistForUser } from "../../services/PlaylistService"
import { toast } from 'react-toastify';
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
            isOpenModalAbout: false,
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


    toggleAboutModal = () => {
        this.setState({
            isOpenModalAbout: !this.state.isOpenModalAbout
        })
    }


    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = +this.props.match.params.id;
            let dataArtists = await getDetailArtists(id);
            let allArtists = await getAllArtists();

            allArtists = allArtists.artists.filter(item => item.id !== id)

            dataArtists.artists.ArtistsForSong.map((item, index) => {
                item.nameArtistsForSong = "";
                item.SongOfArtists.map((x, y) => {
                    item.nameArtistsForSong = item.nameArtistsForSong + x.fullName + ', ';
                })
                item.nameArtistsForSong = item.nameArtistsForSong.replace(/,(\s+)?$/, '');
            })

            if (dataArtists && dataArtists.artists) {

                let result = dataArtists.artists.ArtistsForSong.map(item => {
                    if (!isNaN(item.timePlay)) {
                        item.timePlay = this.fancyTimeFormat(item.timePlay, 'SONGS');
                    }
                    return item;
                })


                this.setState({
                    id: id,
                    fullName: dataArtists.artists.fullName,
                    country: dataArtists.artists.ArtistsCountry.nameCountry,
                    countSongs: Object.keys(dataArtists.artists.ArtistsForSong).length,
                    listSongs: result,
                    image: dataArtists.artists.image,
                    countAlbums: Object.keys(dataArtists.artists.ArtistsForAlbums).length,
                    allAlbums: dataArtists.artists.ArtistsForAlbums,
                    listArtists: allArtists,
                    description: dataArtists.artists.description
                })
            }

        }

    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.id && (prevState.id !== +this.props.match.params.id)) {
            let id = +this.props.match.params.id;
            let dataArtists = await getDetailArtists(id);
            let allArtists = await getAllArtists();

            allArtists = allArtists.artists.filter(item => item.id !== id)

            dataArtists.artists.ArtistsForSong.map((item, index) => {
                item.nameArtistsForSong = "";
                item.SongOfArtists.map((x, y) => {
                    item.nameArtistsForSong = item.nameArtistsForSong + x.fullName + ', ';
                })
                item.nameArtistsForSong = item.nameArtistsForSong.replace(/,(\s+)?$/, '');
            })

            if (dataArtists && dataArtists.artists) {

                let result = dataArtists.artists.ArtistsForSong.map(item => {
                    if (!isNaN(item.timePlay)) {
                        item.timePlay = this.fancyTimeFormat(item.timePlay, 'SONGS');
                    }
                    return item;
                })


                this.setState({
                    id: id,
                    fullName: dataArtists.artists.fullName,
                    country: dataArtists.artists.ArtistsCountry.nameCountry,
                    countSongs: Object.keys(dataArtists.artists.ArtistsForSong).length,
                    listSongs: result,
                    image: dataArtists.artists.image,
                    countAlbums: Object.keys(dataArtists.artists.ArtistsForAlbums).length,
                    allAlbums: dataArtists.artists.ArtistsForAlbums,
                    listArtists: allArtists,
                    description: dataArtists.artists.description
                })
            }
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

    playAllPlaylist = async (listSongs) => {

        await this.props.playAllPlaylist(listSongs, 'ALL');
    }
    handleAlbum = (id) => {
        this.props.history.push(`/album/${id}`)
    }

    playSong = async (pos, listSongs) => {

        let result = listSongs.filter((item, index) => index >= pos)
        await this.props.playAllPlaylist(result, 'ALL');
    }

    handleOpenModalAbout = () => {
        this.setState({
            isOpenModalAbout: true
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
        console.log("Queue: ", detailSong)

        let result = [];
        if (detailSong) {
            result.push(detailSong);
        }
        await this.props.playAllPlaylist(result, 'QUEUE');
    }






    render() {
        let visible = this.state.visible;


        let { listSongs, namePlaylist, image, description, countSongs, playlistTimeLength,
            id, fullName, country, countAlbums, allAlbums, listArtists
        } = this.state

        let { listPlaylistOfUser } = this.props


        return (
            <>
                <div className="wrap">
                    <div className="list-area">
                        <Sidebar />
                        <div className="main">
                            <Header />

                            <div className="main main-artists">
                                <div className='content row'>
                                    <div className='avatar col-3'>
                                        <img src={image} />
                                    </div>
                                    <div className='title-artists col-9'>
                                        <div>
                                            ARTISTS
                                        </div>
                                        <div className="song-Name">
                                            {fullName}
                                        </div>
                                        <div>
                                            {/* Duc Fuc.  SINGLE 2021 1 song, 3 min 25 sec */}

                                            <span>{country} - {countSongs} songs - {countAlbums} albums </span>
                                        </div>
                                    </div>

                                </div>
                                <div className="like-song">
                                    <div className='button-playlist' onClick={() => this.playAllPlaylist(listSongs)}><i class='fas fa-play'></i> </div>
                                </div>
                                {listSongs && Object.keys(listSongs).length > 0 &&
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
                                                {listSongs && listSongs.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td scope="row" style={{ borderTop: 'none' }} onClick={() => this.playSong(index, listSongs)}>{index + 1}</td>
                                                            <td className="info-song-play" style={{ borderTop: 'none' }} onClick={() => this.playSong(index, listSongs)}>
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


                                                            <td style={{ borderTop: 'none' }}>{item.timePlay}</td>
                                                            <td style={{ borderTop: 'none' }}>
                                                                <Tippy
                                                                    delay={200} theme='dark' trigger='click'
                                                                    placement={'bottom'} animation='perspective' offset={[40, 20]} interactive={true}
                                                                    content={
                                                                        <div style={{ minWidth: '200px', cursor: 'pointer' }}>
                                                                            <h5 onClick={() => this.handleAddToQueue(item)}>Add to queue</h5>
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
                                }


                                {/* Albums */}


                                {countAlbums > 0 &&

                                    <div className='list-music-container'>
                                        <div className='title-list'>
                                            <h4>Albums</h4>
                                        </div>
                                        <div className='list-item row'>
                                            {allAlbums.map((item, index) => {
                                                if (index < 6) {
                                                    return (
                                                        <div className='cart-music col-2' key={index} onClick={() => this.handleAlbum(item.id)} >
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

                                }

                                <FanAlsoLike listArtists={listArtists} />
                                <hr />

                                <div className='about-container' onClick={() => this.handleOpenModalAbout()}>
                                    <div className='title-about'>
                                        <h2>About</h2>
                                    </div>
                                    <div className='content-about row'>
                                        <div className='image-about-artists'>
                                            <img src={image} />
                                        </div>
                                        <div className='description-about'>
                                            <span>{description}</span>
                                        </div>
                                    </div>
                                </div>
                                <AboutArtist
                                    isOpen={this.state.isOpenModalAbout}
                                    toggleFromParent={this.toggleAboutModal}
                                    image={image}
                                    description={description}
                                />
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
        listPlaylistOfUser: state.user.listPlaylistOfUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPlaylist: () => dispatch(actions.fetchAllPlaylist()),
        playAllPlaylist: (listSongs, typeSong) => dispatch(actions.playAllPlaylist(listSongs, typeSong)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailArtists);
