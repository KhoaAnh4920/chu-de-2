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



let createNewSong = (file, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resultSong = {};
            let resultImage = {};
            // upload song //
            if (file && data.fileNameSong) {
                const extName = path.extname(file.originalname).toString();
                const file64 = parser.format(extName, file.buffer);

                resultSong = await uploadCloud(file64.content, data.fileNameSong, 'audio');
            }
            if (data.image && data.fileNameImage) {
                resultImage = await uploadCloud(data.image, data.fileNameImage, 'image');
            }

            await db.Songs.create({
                nameSong: data.nameSong,
                lyrics: data.lyrics,
                description: data.description,
                countListen: 0,
                genresId: data.genres,
                timePlay: (resultSong && resultSong.duration) ? resultSong.duration : '',
                image: (resultImage && resultImage.secure_url) ? resultImage.secure_url : '',
                public_id_image: (resultImage && resultImage.public_id) ? resultImage.public_id : '',
                url: (resultSong && resultSong.secure_url) ? resultSong.secure_url : '',
                public_id_url: (resultSong && resultSong.public_id) ? resultSong.public_id : ''
            }).then(function (x) {
                if (x.id) {
                    let dataArtists = JSON.parse(data.artists);
                    let result = [];
                    dataArtists.map(item => {
                        let obj = {};

                        obj.artistsId = item.value;
                        obj.songId = x.id
                        result.push(obj)
                    })

                    db.ArtistsSong.bulkCreate(result);
                }
            });

            resolve({
                errCode: 0,
                errMessage: 'OK'
            }); // return 

        } catch (e) {
            reject(e);
        }
    })
}


let getAllSongs = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let song = await db.Songs.findAll({
                include: [
                    { model: db.Artists, as: 'SongOfArtists' },
                    { model: db.Genres, as: 'GenresSong', attributes: ['genresName'] },
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

let getEditSong = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let song = await db.Songs.findOne({
                where: { id: id },
                include: [
                    { model: db.Artists, as: 'SongOfArtists' },
                    { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
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

let getAllSongsByArtists = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let song = await db.Songs.findAll({

                include: [
                    { model: db.Artists, as: 'SongOfArtists', where: { id: id } },
                    { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
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

let getAllSongsByGenres = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let song = await db.Songs.findAll({

                include: [
                    { model: db.Genres, as: 'GenresSong', where: { id: id }, attributes: ['id', 'genresName'] },
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

let getAllSongsByArtistsGenres = (artistsId, genresId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let song = {};
            if (+genresId === 0) {

                song = await db.Songs.findAll({
                    include: [
                        { model: db.Artists, as: 'SongOfArtists', where: { id: artistsId } },
                    ],
                    raw: true,
                    nest: true
                });
            } else {
                song = await db.Songs.findAll({
                    include: [
                        { model: db.Artists, as: 'SongOfArtists', where: { id: artistsId } },
                        { model: db.Genres, as: 'GenresSong', where: { id: genresId }, attributes: ['id', 'genresName'] },
                    ],
                    raw: true,
                    nest: true
                });
            }
            resolve(song);
        } catch (e) {
            reject(e);
        }
    })
}

let updateSong = (file, data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errorCode: 2,
                    errMessage: 'Missing id'
                })
            } else {
                let song = await db.Songs.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (song) {
                    let resultSong = {};
                    let resultImage = {};


                    // upload song //
                    if (file && data.fileNameSong) {
                        // Xoa bai cu //
                        if (song.url && song.public_id_url) {
                            await cloudinary.uploader.destroy(song.public_id_url, { invalidate: true, resource_type: "video" },
                                function (err, result) { console.log(result) });
                        }
                        // update bai moi //
                        const extName = path.extname(file.originalname).toString();
                        const file64 = parser.format(extName, file.buffer);

                        resultSong = await uploadCloud(file64.content, data.fileNameSong, 'audio');
                    }
                    // update image // 
                    if (data.image && data.fileNameImage) {
                        // Xoa hinh cu //
                        if (song.image && song.public_id_image) {
                            await cloudinary.uploader.destroy(song.public_id_image, { invalidate: true, resource_type: "raw" },
                                function (err, result) { console.log(result) });
                        }
                        resultImage = await uploadCloud(data.image, data.fileNameImage, 'image');
                    }

                    await db.ArtistsSong.destroy({
                        where: { songId: data.id }
                    })

                    song.nameSong = data.nameSong;
                    song.lyrics = data.lyrics;
                    song.description = data.description;
                    song.genresId = data.genres;
                    if (resultSong && resultSong.duration)
                        song.timePlay = resultSong.duration;
                    if (resultImage && resultImage.secure_url)
                        song.image = resultImage.secure_url;
                    if (resultImage && resultImage.public_id)
                        song.public_id_image = resultImage.public_id
                    if (resultSong && resultSong.secure_url)
                        song.url = resultSong.secure_url
                    if (resultSong && resultSong.public_id)
                        song.public_id_url = resultSong.public_id

                    // update table ArtistsSong //
                    let dataArtists = JSON.parse(data.artists);

                    let result = [];
                    dataArtists.map(item => {
                        let obj = {};

                        obj.artistsId = item.value;
                        obj.songId = song.id
                        result.push(obj)
                    })

                    await db.ArtistsSong.bulkCreate(result);
                    await song.save();

                    resolve({
                        errCode: 0,
                        message: "Update bai hat thanh cong"
                    });

                } else {
                    resolve({
                        errorCode: 1,
                        errMessage: "Bai hat ko tim thay"
                    });
                }

            }

        } catch (e) {
            reject(e);
        }
    })
}


let deleteSong = (id) => {
    return new Promise(async (resolve, reject) => {
        let song = await db.Songs.findOne({
            where: { id: id }
        })
        if (!song) {
            resolve({
                errCode: 2,
                errMessage: 'Bai hat ko ton tai'
            })
        }

        if (song.image && song.public_id_image) {
            // Xóa hình cũ //
            await cloudinary.uploader.destroy(song.public_id_image, { invalidate: true, resource_type: "raw" },
                function (err, result) { console.log(result) });
        }
        if (song.url && song.public_id_url) {
            // xoa nhac cu //
            await cloudinary.uploader.destroy(song.public_id_url, { invalidate: true, resource_type: "video" },
                function (err, result) { console.log(result) });
        }

        // Xoa bang trung gian //
        await db.ArtistsSong.destroy({
            where: { songId: id }
        })

        await db.Songs.destroy({
            where: { id: id }
        });
        resolve({
            errCode: 0,
            errMessage: "Delete song ok"
        })
    })
}






module.exports = {
    createNewSong,
    getAllSongs,
    getEditSong,
    updateSong,
    deleteSong,
    getAllSongsByArtists,
    getAllSongsByArtistsGenres,
    getAllSongsByGenres
}