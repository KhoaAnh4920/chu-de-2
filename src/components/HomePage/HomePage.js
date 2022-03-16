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
import { getAllAlbums } from '../../services/AlbumService'
import { getAllPlaylist } from '../../services/PlaylistService';


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            listPlaylist: [],
            listAlbums: []
        }
    }

    async componentDidMount() {
        let allPlaylist = await getAllPlaylist();
        let allAlums = await getAllAlbums();
        console.log("ALBUMS: ", allAlums)
        if (allAlums) {
            this.setState({
                listAlbums: allAlums.albums,
                listPlaylist: allPlaylist.playlist
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


    render() {


        let { listAlbums, listPlaylist } = this.state

        console.log(this.state);
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
                                        <NavLink activeClassName="active1" to="/all" exact>SEE ALL</NavLink>
                                    </div>
                                    <div className='list-item row'>
                                        {listPlaylist.map((item, index) => {

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

                                        })}

                                    </div>
                                </div>
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>Albums hot</h4>
                                    </div>
                                    <div className='list-item row'>
                                        {listAlbums.map((item, index) => {
                                            return (
                                                <div className='cart-music col-2' key={index} >
                                                    <div className='music-img'>
                                                        <img src={item.image} />
                                                        <div className='button-play'><i class='fas fa-play'></i> </div>
                                                    </div>
                                                    <div className='music-name'>{item.albumName}</div>
                                                    <div className='music-description'>{item.description}</div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>Made for you</h4>
                                        <NavLink activeClassName="active1" to="/all" exact>SEE ALL</NavLink>
                                    </div>
                                    <div className='list-item row'>
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
                                        </div>
                                    </div>
                                </div>
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>Recently played</h4>
                                        <NavLink activeClassName="active1" to="/all" exact>SEE ALL</NavLink>
                                    </div>
                                    <div className='list-item row'>
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
                                        </div>
                                    </div>
                                </div>

                                {/* ARTISTS */}
                                <FanAlsoLike />
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
        listPlaylist: state.admin.listPlaylist
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPlaylist: () => dispatch(actions.fetchAllPlaylist()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
