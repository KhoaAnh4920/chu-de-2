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

        let { typeSong } = this.props;

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
                    clearPriorAudioLists={(typeSong === 'QUEUE') ? false : true}
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
