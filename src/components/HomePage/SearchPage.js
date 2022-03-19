import React, { Component } from "react";
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeaderSearch from "./HeaderSearch";
import Sidebar from "../Share/Sidebar";
import PlayBar from "../Share/PlayBar";
import './SearchPage.scss';
import $, { data } from "jquery";
import imgHotHit from '../../assets/images/music/HotHit.jpg';
import { result } from "lodash";
class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            listTest: [],
            showResult: false,
            isHaveSong: false
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

    getName = (song) => {
        //console.log('check song: ', song.song.SongOfArtists)
        if (song && song.song && song.song.SongOfArtists) {
            if (song.song.SongOfArtists) {
                this.setState({
                    listTest: song
                })
                const result = Object.values(this.state.listTest);

                this.setState({
                    data: result,
                    showResult: true,
                    isHaveSong: true
                })
            }
            else {
                this.setState({
                    showResult: false,
                    isHaveSong: false
                })
            }
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

    handleDetailSong = (id) => {
        this.props.history.push(`/detail-song/${id}`)
    }



    render() {
        let { data } = this.state
        let { showResult } = this.state

        console.log(data)

        return (
            <>
                <div className="wrap">
                    <div className="list-area">
                        <Sidebar />
                        <div className="main">
                            <HeaderSearch
                                getData={(song) => this.getName(song)}
                            />
                            {showResult === true &&
                                <>
                                    <div className='listSong'>
                                        <h3>Result</h3>

                                        <table id="customers" style={{ width: "100%" }}>

                                            {data && data.length > 0 &&
                                                data.map((item, index) => {
                                                    return (

                                                        <tr key={index} onClick={() => this.handleDetailSong(item.id)}>

                                                            <td style={{ width: "50px" }}><img className='imgSong' src={item.image} width="50px" /></td>
                                                            <td className='nameSong'> {item.nameSong}<p className='artistName'>{item.SongOfArtists.map((item, index) => {
                                                                return (<p>{item.fullName}</p>)
                                                            })}</p></td>
                                                            <td className='theloai'>{item.GenresSong.genresName}</td>
                                                            <td>{this.fancyTimeFormat(item.timePlay, 'SONGS')}</td>

                                                        </tr>)
                                                })
                                            }
                                        </table></div>
                                </>
                            }
                            {showResult === false &&
                                <>
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
                                </>}
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);