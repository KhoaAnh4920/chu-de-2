import db from "../models/index";
import HistorySongService from '../Services/HistorySongService'


let handleSaveHistorySong = async (req, res) => {
    let data = req.body;
    let message = await HistorySongService.SaveHistorySongService(data);
    return res.status(200).json(message);
}
let getSongHistoryByIDUser = async (req, res) => {
    let id = req.query;
    let message = await HistorySongService.getHistorySongByUserIDService(id);
    return res.status(200).json(message);
}
module.exports = {

    handleSaveHistorySong,
    getSongHistoryByIDUser
}