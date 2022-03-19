import db from "../models/index";
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();
const path = require('path')
require('dotenv').config();
var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

let uploadCloud = (data, fName, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            await cloudinary.uploader.upload(
                data,
                {
                    resource_type: (type === 'image') ? "raw" : "video",
                    public_id: (type === 'image') ? `image/song/${fName}` : `audio/${fName}`,
                },
                // Send cloudinary response or catch error
                (err, result) => {
                    if (err) console.log(err);
                    if (result) {
                        resolve(result)
                    }

                }
            );
        } catch (e) {
            reject(e);
        }
    })

}


let SaveLikeSongService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.LikeSong.create({
                userId: data.userId,
                songId: data.songId,
            })

            resolve({
                errCode: 0,
                errMessage: 'thêm vào bài hát yêu thích thành công',
            }); // return 

        } catch (e) {
            reject(e);
        }
    })
}

let getLikeSongByUserIDService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let song = await db.LikeSong.findAll({
                where: { userId: id.id },
                include: [
                    { model: db.Songs, as: 'SongLike' },
                ],
                raw: false,
                nest: true
            });
            resolve(song);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    SaveLikeSongService,
    getLikeSongByUserIDService
}