import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './PlayBar.scss';


import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'



class PlayBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    playAudio() {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.play()
    }


    render() {



        const audioList = [
            {
                cover: 'https://res.cloudinary.com/dpo9d3otr/image/upload/v1645693166/Image/aiBiet_ossbtg.jpg',
                musicSrc: 'https://res.cloudinary.com/dpo9d3otr/video/upload/v1645693014/audio/WEAN-AI_BIET_eslvvc.mp3',
                name: 'Ai biết',
                singer: 'Wean'
            },
            {
                cover: 'https://res.cloudinary.com/dpo9d3otr/image/upload/v1645694146/Image/3107_wvdq6r.jpg',
                musicSrc: 'https://res.cloudinary.com/dpo9d3otr/video/upload/v1645694160/audio/3107_wwc1o4.mp3',
                name: '3107',
                singer: 'W/n ft. Nâu, Duongg'
            },
            {
                cover: 'https://res.cloudinary.com/dpo9d3otr/image/upload/v1645694991/Image/BuildABitch_jzlp3g.jpg',
                musicSrc: 'https://res.cloudinary.com/dpo9d3otr/video/upload/v1645695017/audio/Build_a_Btch_gi7jaj.mp3',
                name: 'Build a B*tch',
                singer: 'Bella Poarch'
            },

        ]

        return (
            <>
                {/* <div className="playbar">
                    <div className="album-cover">
                        <div className="album-cover__img" />
                        <div className="album-cover__text-box">
                            <div className="album-cover__wrap">
                                <p className="album-cover__title">Morning Sun</p>
                                <div className="album-cover__icon-box">
                                    <i className="album-cover__icon far fa-heart" />
                                    <i className="album-cover__icon fas fa-ban" />
                                </div>
                            </div>
                            <div>
                                <p className="album-cover__artist">Emile Almira, Lizzie Statham</p>
                            </div>
                        </div>
                    </div>
                    <div className="play-btns">
                        <ul className="play-btns__wrap play-btns__icon-box">
                            <li className="play-btns__list"><i className="play-btns__icon fas fa-random" /></li>
                            <li className="play-btns__list"><i className="play-btns__icon fas fa-step-backward" /></li>
                            <li className="play-btns__list play-pause"><i className="play-btns__icon far fa-play-circle" onClick={this.playAudio} /></li>
                            <li className="play-btns__list"><i className="play-btns__icon fas fa-step-forward" /></li>
                            <li className="play-btns__list"><i className="play-btns__icon fas fa-sync" /></li>
                        </ul>
                        <ul className="play-btns__wrap play-btns__range-bar">
                            <li>
                                <p>2:03</p>
                            </li>
                            <li className="play-btns__bar">
                                <div>
                                    <input type="range" onInput={(event) => this.handleKeoTha(event)} defaultValue={60} min={0} max={100} />
                                </div>
                            </li>
                            <li>
                                <p>3:52</p>
                            </li>
                        </ul>
                    </div>
                    <div className="ect-btns">
                        <ul className="ect-btns__inner">
                            <li className="ect-btns__list"><i className="ect-btns__icon fas fa-list" /></li>
                            <li className="ect-btns__list"><i className="ect-btns__icon fas fa-mobile-alt" /></li>
                            <li className="ect-btns__list ect-btns__list--volume">
                                <i className="ect-btns__icon fas fa-volume-up" />
                                <div className="ect-btns__bar">
                                    <input type="range" onInput={(event) => this.handleKeoTha(event)} defaultValue={100} min={0} max={100} />
                                </div>
                            </li>
                            <li className="ect-btns__list"><i className="ect-btns__icon fas fa-expand-alt" /></li>
                        </ul>
                    </div>
                    {/* <div class="audio-wrapper">
                            <audio id="player2" preload="auto">
                                <source src="http://d2cstorage-a.akamaihd.net/wbr/gotnext/8578.mp3" type="audio/mp3" />
                            </audio>
                        </div> */}




                {/* </div>  */}



                <ReactJkMusicPlayer
                    audioLists={audioList}
                    toggleMode={false}
                    mode="full"
                    showThemeSwitch={false}
                />

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

export default connect(mapStateToProps, mapDispatchToProps)(PlayBar);
