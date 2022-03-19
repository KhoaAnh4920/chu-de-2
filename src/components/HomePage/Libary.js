import React, { Component } from "react";
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Switch, NavLink } from 'react-router-dom';
import './HomePage.scss';
import $ from "jquery";
import imgHotHit from '../../assets/images/music/HotHit.jpg';
import logoMusic from '../../assets/images/logo/logoMusicLibary.jpg';

import Header from '../Share/Header';
import Sidebar from '../Share/Sidebar';
import { saveLikeSong, getLikeSong } from "../../services/likeSongService";
import * as actions from "../../store/actions";







class Libary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            likeSong: [],
            countOfLike: '',
            isLogin: false,
            userInfo: {},
            listPlaylistOfUser: []
        }

    }
    async componentDidMount() {
        let { isLoggedInUser, userInfo, listPlaylistOfUser } = this.props;

        if (userInfo) {
            await this.props.fetchAllPlaylistByUser(userInfo.id)
            await this.setState({
                isLogin: isLoggedInUser,
                userInfo,
                listPlaylistOfUser
            })


            let id = this.props.userInfo.id;
            let res = await getLikeSong(id);

            var uniq = {};
            res = res.filter(obj => !uniq[obj.songId] && (uniq[obj.songId] = true));
            this.setState({
                listLikeSong: res,
                haveLikeSongs: !this.state.haveLikeSongs,
                countOfLike: res.length
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
    }


    handlePlaylist = (id) => {
        this.props.history.push(`/create-playlist/${id}`)
    }


    render() {

        let { listPlaylistOfUser, userInfo } = this.state


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
                                        <h4>Playlists</h4>
                                    </div>
                                    <div className="libary-content row">
                                        <div className="total-likesongs col-3" style={{ marginBottom: '20px' }}>
                                            <div className="text-titleLike">
                                                <NavLink className="text-titleLikeLink" activeClassName="" to="/liked-song" exact>LIKE SONG</NavLink>
                                            </div>
                                            <div className="text-totalLike">
                                                bạn đã thích {this.state.countOfLike} bài hát gần đây
                                            </div>
                                            <div className='button-play'
                                            ><i class='fas fa-play'></i> </div>
                                        </div>
                                        {listPlaylistOfUser && Object.keys(listPlaylistOfUser).length > 0 &&
                                            listPlaylistOfUser.map((item, index) => {
                                                return (
                                                    <div className="playlist-child col-2" key={index} onClick={() => this.handlePlaylist(item.id)}>
                                                        <div className="img-libary">
                                                            <div className="img-content">
                                                                <img src={item.image} />
                                                                <div className='button-play'
                                                                ><i class='fas fa-play'></i> </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-libary">
                                                            <p className="name-playlistInLibary">{item.playlistName}</p>
                                                            <p>by {(userInfo && userInfo.fullName) ? userInfo.fullName : ''}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })

                                        }
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
        userInfo: state.user.userInfo,
        listPlaylistOfUser: state.user.listPlaylistOfUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPlaylistByUser: (id) => dispatch(actions.fetchAllPlaylistByUser(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Libary);