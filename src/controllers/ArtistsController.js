import db from "../models/index";
import ArtistsService from '../Services/ArtistsService'


let getAllCountry = async (req, res) => {
    try {
        let data = await ArtistsService.getAllCountry();
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all roles error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let handleCreateNewArtists = async (req, res) => {
    let message = await ArtistsService.createNewArtists(req.body);
    return res.status(200).json(message);
}

let handleGetAllArtists = async (req, res) => {
    let artists = await ArtistsService.getAllArtists();
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        artists
    })

}

let getEditArtists = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let artists = await ArtistsService.getEditArtists(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            artists
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Mising id',
        })
    }
}

let handleEditArtists = async (req, res) => {
    let data = req.body;
    let message = await ArtistsService.updateArtists(data);
    return res.status(200).json(message)
}

let handleDeleteArtists = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing id"
        })
    }
    let message = await ArtistsService.deleteArtists(req.body.id);
    return res.status(200).json(message);
}


module.exports = {
    getAllCountry,
    handleCreateNewArtists,
    handleGetAllArtists,
    getEditArtists,
    handleEditArtists,
    handleDeleteArtists
}