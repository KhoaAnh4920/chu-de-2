import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import logoFrontEnd from '../../assets/images/logo2.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch, NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { withRouter } from 'react-router';
import * as actions from "../../store/actions";

import './Sidebar.scss';


class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visiblePlaylist: false,
            visibleLike: false,
            isLogin: false,
            userInfo: {},
            listPlaylistOfUser: []
        }
    }

    async componentDidMount() {
        let { isLoggedInUser, userInfo, listPlaylistOfUser } = this.props;

        if (userInfo) {
            await this.props.fetchAllPlaylistByUser(userInfo.id)
            await this.setState({
                isLogin: isLoggedInUser,
                userInfo,
                listPlaylistOfUser
            })
        }

    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.isLoggedInUser !== this.props.isLoggedInUser) {
            await this.setState({
                isLogin: this.props.isLoggedInUser
            })
        }
        if (prevProps.userInfo !== this.props.userInfo) {
            await this.setState({
                userInfo: this.props.userInfo
            })
        }
        if (prevProps.listPlaylistOfUser !== this.props.listPlaylistOfUser) {
            await this.setState({
                listPlaylistOfUser: this.props.listPlaylistOfUser
            })
        }
    }


    toogleBtnTippy = () => {
        if (this.state.isLogin === false) {
            let visible = this.state.visible;
            this.setState({
                visible: !this.state.visible,
            })
        }
    }
    toogleBtnTippyPlayList = async () => {
        if (!this.state.isLogin) {
            let visiblePlaylist = this.state.visiblePlaylist;
            this.setState({
                visiblePlaylist: !this.state.visiblePlaylist
            })
        } else {
            await this.props.createNewPlaylistUser(this.state.userInfo)
            await this.props.fetchAllPlaylistByUser(this.state.userInfo.id);
        }
    }
    handleLogin = () => {
        toast.success('chưa đăng nhập');
        //alert('aaaaaaaa');
    }

    handleOpenLogin = () => {
        this.props.history.push('/login')
    }
    handlePlaylist = (id) => {
        this.props.history.push(`/create-playlist/${id}`)
    }


    directHome = () => {
        this.props.history.push('/')
    }






    render() {

        let { visible, visiblePlaylist, listPlaylistOfUser } = this.state

        return (
            <>
                <div className="side">
                    <div className="side__wrap side__nav">
                        <div className="logo">
                            <img src={logoFrontEnd} onClick={() => this.directHome()} />
                        </div>
                        <ul className="nav">
                            <li className="nav__list">
                                <i className="nav__icon fas fa-home" />
                                <NavLink activeClassName="" to="/" exact><p className="nav__text">Home</p></NavLink>
                            </li>
                            <li className="nav__list">
                                <i class="nav__icon fas fa-search"></i>
                                <NavLink activeClassName="" to="/search" exact><p className="nav__text">Search</p></NavLink>
                            </li>
                            <li className="nav__list">
                                <i class="nav__icon fas fa-book-open"></i>

                                <Tippy
                                    delay={200} visible={visible}
                                    placement={'right'} animation='perspective' offset={[20, 30]}
                                    theme={'light'} interactive={true} content={
                                        <div>
                                            <h4>Enjoy your libary</h4>
                                            <p>Login to see saved songs, podcarts, artist, and playlist in Your libary</p>
                                            <button className="btn-notnow" onClick={this.toogleBtnTippy}>Not now</button>
                                            <button className='btn-login-tippy' >Login</button>
                                        </div>
                                    }>
                                    <NavLink activeClassName="" to="/libary" exact><p className="nav__text" onClick={() => this.toogleBtnTippy()}>
                                        Your libary
                                    </p>
                                    </NavLink>

                                </Tippy>
                            </li>
                            <li className="nav__list" style={{ marginTop: '20px' }}>
                                <i className="nav__icon fas fas fa-plus-circle" />

                                <Tippy placement='right' interactive={true} visible={visiblePlaylist}
                                    theme='light' offset={[20, 30]} delay={200} animation='perspective'
                                    content={
                                        <div>
                                            <h4>Enjoy your Playlist</h4>
                                            <p>Login to see saved songs, podcarts, artist, and playlist in Your Playlist</p>
                                            <button className="btn-notnow" onClick={() => this.toogleBtnTippyPlayList()}>Not now</button>
                                            <button className='btn-login-tippy'><a href='/login' style={{ textDecoration: 'none', color: '#fff' }}>Login</a></button>
                                        </div>
                                    }>
                                    <p className="nav__text" onClick={() => this.toogleBtnTippyPlayList()}>Create Playlist</p>
                                </Tippy>

                            </li>
                            <li className="nav__list">
                                <i class="nav__icon fas fa-heart"></i>
                                <NavLink activeClassName="" to="/liked-song" exact><p className="nav__text">Liked Songs</p></NavLink>
                            </li>

                            {listPlaylistOfUser && listPlaylistOfUser.map((item, index) => {
                                if (index === 0) {

                                    return (
                                        <li className="nav__list" style={{ borderTop: '1px solid #242424', marginTop: '20px', width: '100%' }} key={index} onClick={() => this.handlePlaylist(item.id)}>
                                            <p className=" nav__text">{(item.playlistName == 'My Playlist ') ? `My Playlist #${index + 1}` : item.playlistName}</p>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li className="nav__list" key={index} onClick={() => this.handlePlaylist(item.id)} >
                                            <p className="nav__text">{(item.playlistName == 'My Playlist ') ? `My Playlist #${index + 1}` : item.playlistName}</p>
                                        </li>
                                    )
                                }

                            })}



                        </ul>
                    </div>
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
        createNewPlaylistUser: (userInfo) => dispatch(actions.createNewPlaylistUser(userInfo)),
        fetchAllPlaylistByUser: (id) => dispatch(actions.fetchAllPlaylistByUser(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
