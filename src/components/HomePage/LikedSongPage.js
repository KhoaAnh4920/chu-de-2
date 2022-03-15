import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './LikedSongPage.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Share/Header';
import Sidebar from '../Share/Sidebar';
import PlayBar from '../Share/PlayBar';
import $ from "jquery";

class LikedSongPage extends Component {
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

                <div className="wrapLikedSong">
                    <div className="list-area">
                        <Sidebar />
                        <div className="main">
                            <Header />

                            <div className="wrapcontent">
                                <img className='imgLikedPage ' src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'></img>
                                <div className='title-playlist '>PLAYLIST
                                    <div className='title-likedsong '>Liked Songs</div>
                                </div>
                            </div>

                            <div className='song-content'>
                                <div className='icon-song'><svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M47 18.538L48 16.806L31.478 7.26801V42.327C29.826 40.299 27.313 39 24.5 39C19.538 39 15.5 43.038 15.5 48C15.5 52.963 19.538 57 24.5 57C29.27 57 33.175 53.266 33.471 48.569L33.478 48.433C33.485 48.288 33.485 47.711 33.478 47.566V10.732L47 18.538ZM31.478 48.434C31.252 52.091 28.213 55 24.5 55C20.64 55 17.5 51.86 17.5 48C17.5 44.141 20.64 41 24.5 41C28.213 41 31.252 43.909 31.478 47.566V48.434Z" fill="currentColor">

                                </path></svg></div>
                                Songs you like will apper here
                                <div className='save-song'>Save songs by tapping the heart icon</div>
                                <button class="buttonfind" role="button" >
                                    <Link to="/search">Find Songs</Link></button>
                            </div>
                        </div>
                    </div>
                    {/* PlayBar */}
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
export default connect(mapStateToProps, mapDispatchToProps)(LikedSongPage);