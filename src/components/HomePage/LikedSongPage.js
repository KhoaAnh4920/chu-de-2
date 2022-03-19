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
import { saveLikeSong, getLikeSong } from "../../services/likeSongService";


class LikedSongPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            haveLikeSongs: false,
            listLikeSong: []
        }
    }

    async componentDidMount() {
        let { isLoggedInUser, userInfo, listPlaylistOfUser } = this.props;

        if (userInfo) {
            let id = this.props.userInfo.id;
            let res = await getLikeSong(id);
            // console.log('check likesong from like song page: ', res)
            var uniq = {};
            res = res.filter(obj => !uniq[obj.songId] && (uniq[obj.songId] = true));
            this.setState({
                listLikeSong: res,
                haveLikeSongs: !this.state.haveLikeSongs
            })

        }

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
        let { listLikeSong } = this.state
        console.log(this.props.userInfo)
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
                                {this.state.haveLikeSongs === false &&
                                    <>
                                        Songs you like will apper here
                                        <div className='save-song'>Save songs by tapping the heart icon</div>
                                        <button class="buttonfind" role="button" >
                                            <Link to="/search">Find Songs</Link></button>
                                    </>
                                }
                                {this.state.haveLikeSongs === true &&
                                    <>
                                        <h2>Song's Like by {this.props.userInfo.fullName}</h2>
                                        <table class="table table-dark table-hover" style={{ backgroundColor: '#1a1a1a', paddingLeft: '20px' }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th
                                                        style={{
                                                            fontSize: '27px', marginBottom: '0px', marginTop: '0px',
                                                            paddingLeft: '10px'
                                                        }} scope="col">Tên bài hát</th>

                                                    <th
                                                        style={{
                                                            fontSize: '27px', marginBottom: '0px', marginTop: '0px',
                                                            paddingLeft: '10px'
                                                        }}
                                                        scope='col'>Lượt nghe</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listLikeSong && listLikeSong.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td className="info-song-play" >
                                                                <div className='content-song' style={{ display: 'flex' }}>
                                                                    <div className='img-song'>
                                                                        <img src={item.SongLike.image} style={{ width: '40px', height: '40px' }} />
                                                                    </div>
                                                                    <div className='title-song' style={{ height: 'flex' }}>
                                                                        <p className="name-song" style={{ fontSize: '17px', marginBottom: '0px', marginTop: '0px', paddingLeft: '10px' }}>
                                                                            {item.SongLike.description}  </p>
                                                                        {/* <p style={{ marginBottom: '0px', paddingLeft: '10px' }}>{item.SongLike.nameSong}</p> */}
                                                                    </div>


                                                                </div>

                                                            </td>

                                                            <td style={{ fontSize: '17px', marginBottom: '0px', marginTop: '0px', paddingLeft: '10px' }}>
                                                                {item.SongLike.countListen} - lượt nghe
                                                            </td>
                                                        </tr>
                                                    )

                                                })}
                                            </tbody>
                                        </table>
                                    </>
                                }
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
        isLoggedInUser: state.user.isLoggedInUser,
        userInfo: state.user.userInfo,
        listPlaylistOfUser: state.user.listPlaylistOfUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LikedSongPage);