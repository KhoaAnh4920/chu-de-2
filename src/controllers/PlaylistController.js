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

let handleDeleteSongInAlbum = async (req, res) => {
    if (!req.body.albumId || !req.body.songId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing id"
        })
    }
    let message = await AlbumService.deleteSongInAlbum(req.body.albumId, req.body.songId);
    return res.status(200).json(message);
}

let handleCreateNewSongInAlbum = async (req, res) => {
    let message = await AlbumService.createNewSongInAlbum(req.body);
    return res.status(200).json(message);
}

let getEditAlbum = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let album = await AlbumService.getEditAlbum(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            album
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Mising id',
        })
    }
}

let handleEditAlbum = async (req, res) => {
    let data = req.body;
    let message = await AlbumService.updateAlbum(data);
    return res.status(200).json(message)
}


let handleDeleteAlbum = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing id"
        })
    }
    let message = await AlbumService.deleteAlbum(req.body.id);
    return res.status(200).json(message);
}



module.exports = {
    handleCreateNewPlaylist,
    getAllPlaylist
}