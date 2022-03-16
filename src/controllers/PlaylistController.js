import db from "../models/index";
import PlaylistService from '../Services/PlaylistService'

let handleCreateNewPlaylist = async (req, res) => {
    let message = await PlaylistService.createNewPlaylist(req.body);
    return res.status(200).json(message);
}


let getAllPlaylist = async (req, res) => {
    try {
        let data = await PlaylistService.getAllPlaylist();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all roles error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getRandomPlaylist = async (req, res) => {
    try {
        let data = await PlaylistService.getRandomPlaylist();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all roles error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleDeleteSongInPlaylist = async (req, res) => {
    if (!req.body.playlistId || !req.body.songId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing id"
        })
    }
    let message = await PlaylistService.deleteSongInPlaylist(req.body.playlistId, req.body.songId);
    return res.status(200).json(message);
}

let handleCreateNewSongInPlaylist = async (req, res) => {
    let message = await PlaylistService.createNewSongInPlaylist(req.body);
    return res.status(200).json(message);
}

let getEditPlaylist = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let playlist = await PlaylistService.getEditPlaylist(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            playlist
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Mising id',
        })
    }
}

let getDetailPlaylist = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let playlist = await PlaylistService.getDetailPlaylist(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            playlist
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Mising id',
        })
    }
}

let handleEditPlaylist = async (req, res) => {
    let data = req.body;
    let message = await PlaylistService.updatePlaylist(data);
    return res.status(200).json(message)
}


let handleDeletePlaylist = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing id"
        })
    }
    let message = await PlaylistService.deletePlaylist(req.body.id);
    return res.status(200).json(message);
}



module.exports = {
    handleCreateNewPlaylist,
    getAllPlaylist,
    handleCreateNewSongInPlaylist,
    handleDeleteSongInPlaylist,
    getEditPlaylist,
    handleDeletePlaylist,
    handleEditPlaylist,
    getDetailPlaylist,
    getRandomPlaylist
}