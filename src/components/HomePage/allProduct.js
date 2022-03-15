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


class allProduct extends Component {

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
                        <Sidebar />
                        <div className="main">
                            <Header />

                            <div className="main__wrap">
                                <div className='list-music-container'>
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
                            </div>
                        </div>
                    </div>
                </div>
                {/* < PlayBar /> */}
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
