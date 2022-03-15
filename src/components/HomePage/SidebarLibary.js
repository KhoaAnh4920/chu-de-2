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

import '../Share/Sidebar.scss';


class SidebarLibary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visiblePlaylist: false,
            visibleLike: false,
            isLogin: false,
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }


    toogleBtnTippy = () => {
        if (this.state.isLogin === false) {
            let visible = this.state.visible;
            this.setState({
                visible: !this.state.visible,

            })
        }
    }
    toogleBtnTippyPlayList = () => {
        if (!this.state.isLogin) {
            let visiblePlaylist = this.state.visiblePlaylist;
            this.setState({
                visiblePlaylist: !this.state.visiblePlaylist
            })
        }
    }
    handleLogin = () => {
        toast.success('chưa đăng nhập');
        //alert('aaaaaaaa');
    }

    render() {
        let visible = this.state.visible;
        let visiblePlaylist = this.state.visiblePlaylist;
        return (
            <>
                <div className="side">
                    <div className="side__wrap side__nav">
                        <div className="logo">
                            <img src={logoFrontEnd} />
                        </div>
                        <ul className="nav">
                            <li className="nav__list">
                                <i className="nav__icon fas fa-home" />
                                <NavLink activeClassName="" to="/" exact><p className="nav__text">Home</p></NavLink>
                            </li>
                            <li className="nav__list">
                                <i className="nav__icon far fa-compass" />
                                <NavLink activeClassName="" to="/search" exact><p className="nav__text">Search</p></NavLink>
                            </li>
                            <li className="nav__list">
                                <i className="nav__icon fas fa-broadcast-tower" />
                                <Tippy
                                    delay={200} visible={visible}
                                    placement={'right'} animation='perspective' offset={[20, 30]}
                                    theme={'light'} interactive={true} content={
                                        <div>
                                            <h4>Enjoy your libary</h4>
                                            <p>Login to see saved songs, podcarts, artist, and playlist in Your libary</p>
                                            <button className="btn-notnow" onClick={this.toogleBtnTippy}>Not now</button>
                                            <button className='btn-login-tippy'>Login</button>
                                        </div>
                                    }>
                                    <NavLink activeClassName="" to="/libary" exact><p className="nav__text" onClick={() => this.toogleBtnTippy()}>
                                        Your libary
                                    </p>
                                    </NavLink>

                                </Tippy>
                            </li>
                            <li className="nav__list" style={{ marginTop: '20px' }}>
                                <i className="nav__icon fas fa-broadcast-tower" />
                                <Tippy placement='right' interactive={true} visible={visiblePlaylist}
                                    theme='light' offset={[20, 30]} delay={200} animation='perspective'
                                    content={
                                        <div>
                                            <h4>Enjoy your Playlist</h4>
                                            <p>Login to see saved songs, podcarts, artist, and playlist in Your Playlist</p>
                                            <button className="btn-notnow" onClick={() => this.toogleBtnTippyPlayList()}>Not now</button>
                                            <button className='btn-login-tippy'>Login</button>
                                        </div>
                                    }>
                                    <p className="nav__text" onClick={() => this.toogleBtnTippyPlayList()}>Create Playlist</p>
                                </Tippy>

                            </li>
                            <li className="nav__list">
                                <i className="nav__icon fas fa-broadcast-tower" />
                                <NavLink activeClassName="" to="/liked-song" exact><p className="nav__text">Liked Songs</p></NavLink>
                            </li>
                        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLibary);
