import db from "../models/index";
require('dotenv').config();
import { sequelize } from "../models/index";
var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

let uploadCloud = (data, fName) => {
    return new Promise(async (resolve, reject) => {
        try {
            await cloudinary.uploader.upload(
                data,
                {
                    resource_type: "raw",
                    public_id: `image/albums/${fName}`,
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

let totalTimeLengthAlbums = (songData) => {
    let totalTime = 0;

    console.log(songData);
    if (songData) {
        songData.map((item) => {
            totalTime += item.timePlay;
        })
    }
    return totalTime;
}



let createNewPlaylist = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = {};
            let image = '';

            let playlistTimeLength = await totalTimeLengthAlbums(data.songsData);

            console.log('albumTimeLength: ', playlistTimeLength)

            if (data.image && data.fileName) {
                // upload cloud //
                result = await uploadCloud(data.image, data.fileName);
            } else {
                image = 'https://res.cloudinary.com/cdmedia/image/upload/v1646921892/image/avatar/Unknown_b4jgka.png';
            }

            console.log(result);

            await db.Playlists.create({
                playlistName: data.playlistName,
                genresId: (data.genres !== 0) ? data.genres : null,
                playlistTimeLength: playlistTimeLength,
                image: (result && result.secure_url) ? result.secure_url : image,
                public_id_image: (result && result.public_id) ? result.public_id : '',
                description: data.description

            }).then(function (x) {
                if (x.id) {
                    // insert PlaylistSong //

                    let dataSong = data.songsData;
                    let result = [];
                    if (dataSong) {
                        dataSong.map(item => {
                            let obj = {};
                            obj.playlistId = x.id;
                            obj.songId = item.value

                            result.push(obj);
                        })

                        db.PlaylistSong.bulkCreate(result);
                    }
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


let getAllPlaylist = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let playlist = await db.Playlists.findAll({
                include: [
                    {
                        model: db.Songs, as: 'SongInPlaylist',
                        include: [
                            { model: db.Artists, as: 'SongOfArtists' },
                        ],
                        order: [[{ model: db.Songs }, 'id', 'desc']]
                    },
                    { model: db.Genres, as: 'PlaylistGenre', attributes: ['id', 'genresName'] },
                ],
                // order: sequelize.random(),
                raw: false,
                nest: true
            });

            resolve({
                errCode: 0,
                errMessage: 'OK',
                playlist
            });
        } catch (e) {
            reject(e);
        }
    })
}

let deleteSongInPlaylist = (playlistId, songId) => {
    return new Promise(async (resolve, reject) => {

        let song = await db.Songs.findOne({
            where: { id: songId },
            raw: false
        })
        let playlist = await db.Playlists.findOne({
            where: { id: playlistId },
            raw: false
        })
        if (song && playlist) {
            let timePlay = song.timePlay;
            playlist.playlistTimeLength -= timePlay;

            await playlist.save();
            // Xoa bang trung gian //
            await db.PlaylistSong.destroy({
                where: { playlistId: playlistId, songId: songId }
            })

            resolve({
                errCode: 0,
                errMessage: "Delete song in playlist ok"
            })
        } else {
            resolve({
                errCode: 2,
                errMessage: "Playlist hoặc Bài hát không tồn tại"
            })
        }

    })
}

let createNewSongInPlaylist = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let playlist = await db.Playlists.findOne({
                where: { id: data.playlistId },
                raw: false
            })

            let result = [];

            if (data.selectedSongs) {
                data.selectedSongs.map(item => {
                    playlist.playlistTimeLength += item.timePlay;

                    let obj = {};
                    obj.playlistId = data.playlistId;
                    obj.songId = item.value;
                    result.push(obj);
                })
                await db.PlaylistSong.bulkCreate(result);
                await playlist.save();
            }

            resolve({
                errCode: 0,
                errMessage: 'OK'
            }); // return 


        } catch (e) {
            reject(e);
        }
    })
}


let getEditPlaylist = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let playlist = await db.Playlists.findOne({
                where: { id: id },
                include: [
                    { model: db.Genres, as: 'PlaylistGenre', attributes: ['id', 'genresName'] },
                ],
                raw: false,
                nest: true
            });

            resolve(playlist);
        } catch (e) {
            reject(e);
        }
    })
}

let updatePlaylist = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email //
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    errMessage: 'Missing id'
                })
            } else {
                let playlist = await db.Playlists.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (playlist) {

                    // Có truyền image //
                    if (data.image && data.fileName) {
                        if (playlist.image && playlist.public_id_image) // có lưu trong db //
                        {
                            // Xóa hình cũ //
                            await cloudinary.uploader.destroy(playlist.public_id_image, { invalidate: true, resource_type: "raw" },
                                function (err, result) { console.log(result) });

                        }
                        // upload cloud //
                        result = await uploadCloud(data.image, data.fileName);
                    }

                    playlist.playlistName = data.playlistName;
                    playlist.description = data.description;

                    if (data.image && data.fileName) {
                        playlist.image = result.secure_url;
                        playlist.public_id_image = result.public_id;
                    }


                    await playlist.save();

                    resolve({
                        errCode: 0,
                        message: "Update playlist thanh cong"
                    });

                } else {
                    resolve({
                        errorCode: 1,
                        errMessage: "Không tim thay"
                    });
                }

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                }); // return 
            }


        } catch (e) {
            reject(e);
        }
    })
}



let deletePlaylist = (id) => {
    return new Promise(async (resolve, reject) => {
        let playlist = await db.Playlists.findOne({
            where: { id: id }
        })
        if (!playlist) {
            resolve({
                errCode: 2,
                errMessage: 'Playlist ko ton tai'
            })
        }

        if (playlist.image && playlist.public_id_image) {
            // Xóa hình cũ //
            await cloudinary.uploader.destroy(playlist.public_id_image, { invalidate: true, resource_type: "raw" },
                function (err, result) { console.log(result) });
        }

        // Xoa bang trung gian //
        await db.PlaylistSong.destroy({
            where: { playlistId: id }
        })


        await db.Playlists.destroy({
            where: { id: id }
        })
        resolve({
            errCode: 0,
            errMessage: "Delete playlist ok"
        })
    })
}



module.exports = {
    createNewPlaylist,
    getAllPlaylist,
    createNewSongInPlaylist,
    deleteSongInPlaylist,
    getEditPlaylist,
    deletePlaylist,
    updatePlaylist
}