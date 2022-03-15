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
                cover: 'https://res.cloudinary.com/dpo9d3otr/image/upload/v1645694146/Image/3107_wvdq6r.jpg',
                musicSrc: 'https://res.cloudinary.com/dpo9d3otr/video/upload/v1645694160/audio/3107_wwc1o4.mp3',
                name: '3107',
                singer: 'W/n ft. Nâu, Duongg'
            },
            {
                cover: 'https://res.cloudinary.com/dpo9d3otr/image/upload/v1645693166/Image/aiBiet_ossbtg.jpg',
                musicSrc: 'https://res.cloudinary.com/dpo9d3otr/video/upload/v1645693014/audio/WEAN-AI_BIET_eslvvc.mp3',
                name: 'Ai biết',
                singer: 'Wean'
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
                <ReactJkMusicPlayer
                    audioLists={audioList}
                    toggleMode={false}
                    mode="full"
                    showThemeSwitch={false}
                    defaultVolume={0.5}
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
