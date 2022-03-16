import express from "express";
const multer = require('multer');
import UserController from "../controllers/UserControler";
import GenresController from "../controllers/GenresControler";
import ArtistsController from "../controllers/ArtistsController";
import SongController from "../controllers/SongController";
import AlbumController from "../controllers/AlbumController";
import PlaylistControler from '../controllers/PlaylistController';



let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', (req, res) => {
        return res.send('Hello world')
    });

    router.post('/api/admin-login', UserController.handleLogin);
    router.post('/api/user-login', UserController.handleLogin);
    router.post('/api/user-login-social', UserController.handleLoginSocial);

    // CRUD User //
    router.get('/api/get-roles', UserController.getAllRoles);
    router.post('/api/create-new-user', UserController.handleCreateNewUser);
    router.post('/api/sign-up-new-user', UserController.handleSignUpNewUser);
    router.get('/api/get-all-user', UserController.handleGetAllUser);
    router.get('/api/get-edit-user', UserController.getEditUser);
    router.put('/api/edit-user', UserController.handleEditUser);
    router.delete('/api/delete-user', UserController.handleDeleteUser);

    // CRUD Genres //
    router.post('/api/create-new-genres', GenresController.handleCreateNewGenres);
    router.get('/api/get-all-genres', GenresController.handleGetAllGenres);
    router.get('/api/get-edit-genres', GenresController.getEditGenres);
    router.put('/api/edit-genres', GenresController.handleEditGenres);
    router.delete('/api/delete-genres', GenresController.handleDeleteGenres);

    // CRUD Artists //
    router.get('/api/get-all-country', ArtistsController.getAllCountry);
    router.post('/api/create-new-artists', ArtistsController.handleCreateNewArtists);
    router.get('/api/get-all-artists', ArtistsController.handleGetAllArtists);
    router.get('/api/get-edit-artists', ArtistsController.getEditArtists);
    router.put('/api/edit-artists', ArtistsController.handleEditArtists);
    router.delete('/api/delete-artists', ArtistsController.handleDeleteArtists);

    // CRUD Song //
    let upload = multer();
    router.post('/api/create-new-song', upload.single('fileSong'), SongController.handleCreateNewSongs);
    router.get('/api/get-all-songs', SongController.getAllSongs);
    router.get('/api/get-edit-song', SongController.getEditSong);
    router.put('/api/edit-song', upload.single('fileSong'), SongController.handleEditSong);
    router.delete('/api/delete-song', SongController.handleDeleteSong);

    // CRUD Albums //
    router.get('/api/get-all-songs-by-artists', SongController.getAllSongsByArtists);
    router.get('/api/get-all-songs-by-artists-genres', SongController.getAllSongsByArtistsGenres);
    router.get('/api/get-all-songs-by-genres', SongController.getAllSongsByGenres);

    router.post('/api/create-new-albums', AlbumController.handleCreateNewAlbum);
    router.get('/api/get-all-albums', AlbumController.getAllAlbums);
    router.delete('/api/delete-song-in-album', AlbumController.handleDeleteSongInAlbum);
    router.post('/api/create-new-song-in-albums', AlbumController.handleCreateNewSongInAlbum);
    router.get('/api/get-edit-album', AlbumController.getEditAlbum);
    router.put('/api/edit-album', AlbumController.handleEditAlbum);
    router.delete('/api/delete-album', AlbumController.handleDeleteAlbum);

    // Playlist //
    router.post('/api/create-new-playlist', PlaylistControler.handleCreateNewPlaylist);
    router.get('/api/get-all-playlist', PlaylistControler.getAllPlaylist);
    router.post('/api/create-new-song-in-playlist', PlaylistControler.handleCreateNewSongInPlaylist);
    router.delete('/api/delete-song-in-playlist', PlaylistControler.handleDeleteSongInPlaylist);
    router.get('/api/get-edit-playlist', PlaylistControler.getEditPlaylist);
    router.get('/api/get-detail-playlist', PlaylistControler.getDetailPlaylist);
    router.put('/api/edit-playlist', PlaylistControler.handleEditPlaylist);
    router.delete('/api/delete-playlist', PlaylistControler.handleDeletePlaylist);







    return app.use("/", router);
}

module.exports = initWebRoutes;