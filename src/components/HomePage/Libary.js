import React, { Component } from "react";
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Switch, NavLink } from 'react-router-dom';
import './HomePage.scss';
import $ from "jquery";
import imgHotHit from '../../assets/images/music/HotHit.jpg';
import logoMusic from '../../assets/images/logo/logoMusicLibary.jpg';

import SidebarLibary from './SidebarLibary';
import HeaderLibary from "./HeaderLibary";
class Libary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,

        }

    }
    componentDidMount() {


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


    render() {


        return (
            <>
                <div className="wrap">
                    <div className="list-area">
                        <SidebarLibary />
                        <div className="main">
                            <HeaderLibary />

                            <div className="main__wrap">
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>Playlists</h4>
                                    </div>
                                    <div className="libary-content">
                                        <div className="total-likesongs">
                                            <div className="text-titleLike">
                                                <NavLink className="text-titleLikeLink" activeClassName="" to="/liked-song" exact>LIKE SONG</NavLink>
                                            </div>
                                            <div className="text-totalLike">
                                                0 liked songs
                                            </div>
                                            <div className='button-play'
                                            ><i class='fas fa-play'></i> </div>
                                        </div>
                                        <div className="playlist-child">
                                            <div className="img-libary">
                                                <div className="img-content">
                                                    <img src={logoMusic} />
                                                    <div className='button-play'
                                                    ><i class='fas fa-play'></i> </div>
                                                </div>
                                            </div>
                                            <div className="text-libary">
                                                <p className="name-playlistInLibary">Name playlist</p>
                                                <p>by giang duong</p>
                                            </div>
                                        </div>
                                        <div className="playlist-child">
                                            <div className="img-libary">
                                                <div className="img-content">
                                                    <img src={logoMusic} />
                                                    <div className='button-play'
                                                    ><i class='fas fa-play'></i> </div>
                                                </div>
                                            </div>
                                            <div className="text-libary">
                                                <p className="name-playlistInLibary">Name playlist</p>
                                                <p>by giang duong</p>
                                            </div>
                                        </div>
                                        <div className="playlist-child">
                                            <div className="img-libary">
                                                <div className="img-content">
                                                    <img src={logoMusic} />
                                                    <div className='button-play'
                                                    ><i class='fas fa-play'></i> </div>
                                                </div>
                                            </div>
                                            <div className="text-libary">
                                                <p className="name-playlistInLibary">Name playlist</p>
                                                <p>by giang duong</p>
                                            </div>
                                        </div>
                                        <div className="playlist-child">
                                            <div className="img-libary">
                                                <div className="img-content">
                                                    <img src={logoMusic} />
                                                    <div className='button-play'
                                                    ><i class='fas fa-play'></i> </div>
                                                </div>
                                            </div>
                                            <div className="text-libary">
                                                <p className="name-playlistInLibary">Name playlist</p>
                                                <p>by giang duong</p>
                                            </div>
                                        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Libary);