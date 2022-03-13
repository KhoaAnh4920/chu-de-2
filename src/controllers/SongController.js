import db from "../models/index";
import SongService from '../Services/SongService'




let handleCreateNewSongs = async (req, res) => {
    let message = await SongService.createNewSong(req.file, req.body);
    return res.status(200).json(message);
}

let getAllSongs = async (req, res) => {
    try {
        let data = await SongService.getAllSongs();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all roles error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getEditSong = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let song = await SongService.getEditSong(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            song
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Mising id',
        })
    }
}

let handleEditSong = async (req, res) => {
    let data = req.body;
    let message = await SongService.updateSong(req.file, req.body);
    return res.status(200).json(message)
}

let handleDeleteSong = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing id"
        })
    }
    let message = await SongService.deleteSong(req.body.id);
    return res.status(200).json(message);
}


let getAllSongsByArtists = async (req, res) => {
    let artistsId = req.query.artistsId;
    if (artistsId) {
        let song = await SongService.getAllSongsByArtists(artistsId);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            song
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Mising id',
        })
    }
}

let getAllSongsByArtistsGenres = async (req, res) => {
    let artistsId = req.query.artistsId;
    let genresId = req.query.genresId;

    if (artistsId && genresId) {
        let song = await SongService.getAllSongsByArtistsGenres(artistsId, genresId);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            song
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Mising id',
        })
    }
}

module.exports = {
    handleCreateNewSongs,
    getAllSongs,
    getEditSong,
    handleEditSong,
    handleDeleteSong,
    getAllSongsByArtists,
    getAllSongsByArtistsGenres,
    getAllSongsByArtistsGenres
}