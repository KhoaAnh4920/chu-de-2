import React, { Component } from "react";
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeaderSearch from "./HeaderSearch";
import Sidebar from "../Share/Sidebar";
import PlayBar from "../Share/PlayBar";
import './SearchPage.scss';
import $ from "jquery";
import imgHotHit from '../../assets/images/music/HotHit.jpg';
class SearchPage extends Component {
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
                            <HeaderSearch />

                            <div className="main__wrap">
                                <div className='list-music-container'>
                                    <div className='title-list'>
                                        <h4>Browse all</h4>

                                    </div>
                                    <div className='list-item row'>
                                        <div className='cart col-2' >
                                            <div className="cart-text">Hot Hit</div>
                                            <div className='music'>
                                                <img className="imgSearch" src={imgHotHit} />
                                            </div>
                                        </div>
                                        <div className='cart col-2' >
                                            <div className="cart-text">Hot Hit</div>
                                            <div className='music'>
                                                <img className="imgSearch" src={imgHotHit} />
                                            </div>
                                        </div>
                                        <div className='cart col-2' >
                                            <div className="cart-text">Hot Hit</div>
                                            <div className='music'>
                                                <img className="imgSearch" src={imgHotHit} />
                                            </div>
                                        </div>
                                        <div className='cart col-2' >
                                            <div className="cart-text">Hot Hit</div>
                                            <div className='music'>
                                                <img className="imgSearch" src={imgHotHit} />
                                            </div>
                                        </div>
                                        <div className='cart col-2' >
                                            <div className="cart-text">Hot Hit</div>
                                            <div className='music'>
                                                <img className="imgSearch" src={imgHotHit} />
                                            </div>
                                        </div>
                                        <div className='cart col-2' >
                                            <div className="cart-text">Hot Hit</div>
                                            <div className='music'>
                                                <img className="imgSearch" src={imgHotHit} />
                                            </div>
                                        </div>
                                        <div className='cart col-2' >
                                            <div className="cart-text">Hot Hit</div>
                                            <div className='music'>
                                                <img className="imgSearch" src={imgHotHit} />
                                            </div>
                                        </div>
                                        <div className='cart col-2' >
                                            <div className="cart-text">Hot Hit</div>
                                            <div className='music'>
                                                <img className="imgSearch" src={imgHotHit} />
                                            </div>
                                        </div>
                                        <div className='cart col-2' >
                                            <div className="cart-text">Hot Hit</div>
                                            <div className='music'>
                                                <img className="imgSearch" src={imgHotHit} />
                                            </div>
                                        </div>
                                        <div className='cart col-2' >
                                            <div className="cart-text">Hot Hit</div>
                                            <div className='music'>
                                                <img className="imgSearch" src={imgHotHit} />
                                            </div>
                                        </div>
                                        <div className='cart col-2' >
                                            <div className="cart-text">Hot Hit</div>
                                            <div className='music'>
                                                <img className="imgSearch" src={imgHotHit} />
                                            </div>
                                        </div>
                                        <div className='cart col-2' >
                                            <div className="cart-text">Hot Hit</div>
                                            <div className='music'>
                                                <img className="imgSearch" src={imgHotHit} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);