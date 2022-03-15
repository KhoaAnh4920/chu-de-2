import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomePage.scss';
import './Playlist.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../Share/Header';
import Sidebar from '../Share/Sidebar';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import PlayBar from '../Share/PlayBar';
import $ from "jquery";
import sol7 from '../../assets/images/artist/sol7.jpg';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

class FanAlsoLike extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            visible: false
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
        let visible = this.state.visible;
        return (
            <>
                <div className='list-music-container'>
                    <div className='title-list'>
                        <h4>Fan Also Like</h4>
                        <NavLink activeClassName="active1" to="/all-artist" exact>SEE ALL</NavLink>
                    </div>
                    <div className='list-item row'>
                        <div className='cart-music col-2' >
                            <div className='artist-img'>
                                <img src={sol7} />
                                <div className='button-play'
                                ><i class='fas fa-play'></i> </div>
                            </div>
                            <div className='music-name'>Sol 7</div>
                            <div className='music-description'>Nghệ sĩ</div>
                        </div>
                        <div className='cart-music col-2' >
                            <div className='artist-img'>
                                <img src={sol7} />
                                <div className='button-play'><i class='fas fa-play'></i> </div>
                            </div>
                            <div className='music-name'>Sol 7</div>
                            <div className='music-description'>Nghệ sĩ</div>
                        </div>
                        <div className='cart-music col-2' >
                            <div className='artist-img'>
                                <img src={sol7} />
                                <div className='button-play'><i class='fas fa-play'></i> </div>
                            </div>
                            <div className='music-name'>Sol 7</div>
                            <div className='music-description'>Nghệ sĩ</div>
                        </div>
                        <div className='cart-music col-2' >
                            <div className='artist-img'>
                                <img src={sol7} />
                                <div className='button-play'><i class='fas fa-play'></i> </div>
                            </div>
                            <div className='music-name'>Sol 7</div>
                            <div className='music-description'>Nghệ sĩ</div>
                        </div>
                        <div className='cart-music col-2' >
                            <div className='artist-img'>
                                <img src={sol7} />
                                <div className='button-play'><i class='fas fa-play'></i> </div>
                            </div>
                            <div className='music-name'>Sol 7</div>
                            <div className='music-description'>Nghệ sĩ</div>
                        </div>
                        <div className='cart-music col-2' >
                            <div className='artist-img'>
                                <img src={sol7} />
                                <div className='button-play'><i class='fas fa-play'></i> </div>
                            </div>
                            <div className='music-name'>Sol 7</div>
                            <div className='music-description'>Nghệ sĩ</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FanAlsoLike);
