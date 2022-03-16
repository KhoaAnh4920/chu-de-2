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
            listSongs: []
        }
    }

    componentDidMount() {
        console.log("Check in playbar: ", this.props.listSongs);
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.listSongs !== this.props.listSongs) {
            await this.setState({
                listSongs: []
            })
            console.log("Check update after reset: ", this.state.listSongs)
            let audioList = this.buildAudioList(this.props.listSongs);
            this.setState({
                listSongs: audioList
            })
        }
    }

    playAudio() {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.play()
    }

    buildAudioList = (listSong) => {
        let result = [];

        if (listSong) {
            listSong.map(item => {
                let obj = {};

                obj.cover = item.image;
                obj.musicSrc = item.url;
                obj.name = item.nameSong;

                if (item.SongOfArtists) {
                    item.fullName = '';
                    item.SongOfArtists.map(artist => {
                        item.fullName = item.fullName + artist.fullName + ', ';
                    })
                    obj.singer = item.fullName.replace(/,(\s+)?$/, '');
                }

                result.push(obj)
            })
        }

        return result;

    }


    render() {
        let { listSongs } = this.state;

        // let audioList = this.buildAudioList(listSongs);

        // console.log("audioList: ", audioList);

        // const audioList = [
        //     {
        //         cover: 'https://res.cloudinary.com/dpo9d3otr/image/upload/v1645694146/Image/3107_wvdq6r.jpg',
        //         musicSrc: 'https://res.cloudinary.com/dpo9d3otr/video/upload/v1645694160/audio/3107_wwc1o4.mp3',
        //         name: '3107',
        //         singer: 'W/n ft. Nâu, Duongg'
        //     },
        //     {
        //         cover: 'https://res.cloudinary.com/dpo9d3otr/image/upload/v1645693166/Image/aiBiet_ossbtg.jpg',
        //         musicSrc: 'https://res.cloudinary.com/dpo9d3otr/video/upload/v1645693014/audio/WEAN-AI_BIET_eslvvc.mp3',
        //         name: 'Ai biết',
        //         singer: 'Wean'
        //     },

        //     {
        //         cover: 'https://res.cloudinary.com/dpo9d3otr/image/upload/v1645694991/Image/BuildABitch_jzlp3g.jpg',
        //         musicSrc: 'https://res.cloudinary.com/dpo9d3otr/video/upload/v1645695017/audio/Build_a_Btch_gi7jaj.mp3',
        //         name: 'Build a B*tch',
        //         singer: 'Bella Poarch'
        //     },

        // ]

        return (
            <>
                <ReactJkMusicPlayer
                    audioLists={listSongs}
                    toggleMode={false}
                    mode="full"
                    onAudioReload={true}
                    showThemeSwitch={false}
                    defaultVolume={0.5}
                    quietUpdate
                    clearPriorAudioLists
                    autoPlayInitLoadPlayList={false}

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
