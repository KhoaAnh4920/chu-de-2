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
import imgHotHit from '../../assets/images/music/HotHit.jpg';
import { getAllArtists } from '../../services/ArtistsService';
import { getAllAlbums } from '../../services/AlbumService'
import { getAllPlaylist } from '../../services/PlaylistService';


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
            console.log(url.indexOf("/all/playlist"))
            let listPlaylist = await getAllPlaylist();
            if (listPlaylist) {
                this.setState({
                    listPlaylist: listPlaylist.playlist,
                    listArtists: [],
                    listAllbum: [],
                    listMadeForYou: []
                })
            }
        }
        if (url.indexOf("/all/made-for-you") !== -1) {
            console.log(url.indexOf("/all/made-for-you"))
            let listMadeForYou = await getAllPlaylist();
            if (listMadeForYou) {
                this.setState({
                    listMadeForYou: listMadeForYou.playlist,
                    listArtists: [],
                    listAllbum: [],
                    listPlaylist: [],
                })
            }
        }

        console.log(this.state);

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


    render() {
        let { listArtists, listPlaylist, listMadeForYou } = this.state;


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
                                                <div className='cart-music col-2'  >
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(allProduct);
