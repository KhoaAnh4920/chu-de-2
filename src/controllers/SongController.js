import db from "../models/index";
import SongService from '../Services/SongService'




let handleCreateNewSongs = async (req, res) => {
    let message = await SongService.createNewSong(req.file, req.body);
    return res.status(200).json(message);
}

let getAllSongs = async (req, res) => {
    try {
        let limit = req.query.limit;
        let data = await SongService.getAllSongs(limit);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all roles error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getRandomSongs = async (req, res) => {
    try {
        let limit = req.query.limit;
        let data = await SongService.getRandomSongs(limit);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all roles error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getSongByKeyword = async (req, res) => {
    let kw = req.query.kw;
    if (kw) {
        let songs = await SongService.getSongByKeyword(kw);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            songs
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Mising id',
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

let getDetailSong = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let song = await SongService.getDetailSong(id);
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

let getAllSongsByGenres = async (req, res) => {
    let genresId = req.query.genresId;
    if (genresId) {
        let song = await SongService.getAllSongsByGenres(genresId);
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

let getSongCurrent = () => {

}

let handleEditSongCount = async (req, res) => {
    let data = req.body;
    let message = await SongService.updateSongCount(data);
    return res.status(200).json(message);
}
// let handleSaveHistorySong = async (req, res) => {
//     let data = req.body;
//     console.log('check data ', data)
//     let message = await SongService.SaveHistorySongService(data);
//     return res.status(200).json(message);
// }

let getSongByName = async (req, res) => {
    let nameSong = req.query.nameSong;
    if (nameSong) {
        let song = await SongService.getSongByName(nameSong);
        return res.status(200).json({

            song
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Mising name',
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
    getAllSongsByArtistsGenres,
    getAllSongsByGenres,
    getDetailSong,
    getRandomSongs,
    getSongByKeyword,
    getSongCurrent,
    handleEditSongCount,
    getSongByName
}