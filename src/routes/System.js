import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Dashboard from '../containers/System/Admin/Dashboard';
import AddUser from '../containers/System/Admin/Users/AddUser';
import ListUser from '../containers/System/Admin/Users/ListUser';
import AddGenres from '../containers/System/Admin/Genres/AddGenres';
import EditUser from '../containers/System/Admin/Users/EditUser';
import ListGenres from '../containers/System/Admin/Genres/ListGenres';
import EditGenres from '../containers/System/Admin/Genres/EditGenres';
import CustomScrollbars from '../components/CustomScrollbars';
import AddArtists from '../containers/System/Admin/Artists/AddArtists';
import ListArtists from '../containers/System/Admin/Artists/ListArtists';
import EditArtists from '../containers/System/Admin/Artists/EditArtists';
import AddSong from '../containers/System/Admin/Songs/AddSong';
import ListSong from '../containers/System/Admin/Songs/ListSong';
import EditSong from '../containers/System/Admin/Songs/EditSong';
import AddAlbum from '../containers/System/Admin/Albums/AddAlbum';
import ListAlbum from '../containers/System/Admin/Albums/ListAlbum';
import DetailAlbums from '../containers/System/Admin/Albums/DetailAlbums';
import EditAlbums from '../containers/System/Admin/Albums/EditAlbums';
import AddPlaylist from '../containers/System/Admin/Playlist/AddPlaylist';
import ListPlaylist from '../containers/System/Admin/Playlist/ListPlaylist';
import DetailPlaylist from '../containers/System/Admin/Playlist/DetailPlaylist';


// Route của admin //
class System extends Component {
    render() {
        const colourStyles = {
            menuList: styles => ({
                ...styles,
                background: '#fafafa'
            }),
            option: (styles, { isFocused, isSelected }) => ({
                ...styles,
                color: isFocused ? '#fff' : isSelected ? '#000' : '#000',
                cursor: 'default',
                background: isFocused
                    ? '#0099FF'
                    : isSelected
                        ? '#EEEEEE'
                        : undefined,
                zIndex: 1
            }),
            menu: base => ({
                ...base,
                zIndex: 100
            })
        }

        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                        <Switch>
                            <Route path="/admin/dashboard" component={Dashboard} />
                            <Route path="/admin/add-users" component={() => (<AddUser colourStyles={colourStyles} />)} />
                            <Route path="/admin/list-users" component={ListUser} />
                            <Route path="/admin/edit-user/:id" component={() => (<EditUser colourStyles={colourStyles} />)} />

                            // Genres //
                            <Route path="/admin/add-genres" component={AddGenres} />
                            <Route path="/admin/list-genres" component={ListGenres} />
                            <Route path="/admin/edit-genres/:id" component={EditGenres} />

                            // Artists //
                            <Route path="/admin/add-artists" component={() => (<AddArtists colourStyles={colourStyles} />)} />
                            <Route path="/admin/list-artists" component={ListArtists} />
                            <Route path="/admin/edit-artists/:id" component={() => (<EditArtists colourStyles={colourStyles} />)} />

                            // Songs //
                            <Route path="/admin/add-songs" component={() => (<AddSong colourStyles={colourStyles} />)} />
                            <Route path="/admin/list-songs" component={ListSong} />
                            <Route path="/admin/edit-songs/:id" component={() => (<EditSong colourStyles={colourStyles} />)} />

                            // Album //
                            <Route path="/admin/add-albums" component={() => (<AddAlbum colourStyles={colourStyles} />)} />
                            <Route path="/admin/list-albums" component={ListAlbum} />
                            <Route path="/admin/detail-album/:id" component={DetailAlbums} />
                            <Route path="/admin/edit-album/:id" component={() => (<EditAlbums colourStyles={colourStyles} />)} />

                            // Playlist //
                            <Route path="/admin/add-playlist" component={() => (<AddPlaylist colourStyles={colourStyles} />)} />
                            <Route path="/admin/list-playlist" component={ListPlaylist} />
                            <Route path="/admin/detail-playlist/:id" component={DetailPlaylist} />




                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </CustomScrollbars>
                </div>

                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
