import db from "../models/index";
import LikeSongService from '../Services/LikeSongService'


let handleSaveLikeSong = async (req, res) => {
    let data = req.body;
    let message = await LikeSongService.SaveLikeSongService(data);
    return res.status(200).json(message);
}
let getSongLikeByIDUser = async (req, res) => {
    let id = req.query;
    let message = await LikeSongService.getLikeSongByUserIDService(id);
    return res.status(200).json(message);
}
module.exports = {

    handleSaveLikeSong,
    getSongLikeByIDUser
}