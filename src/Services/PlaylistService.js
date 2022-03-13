import db from "../models/index";
require('dotenv').config();
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
                genresId: (data.genres !== 0) ? data.genres : '',
                playlistTimeLength: playlistTimeLength,
                image: (result && result.secure_url) ? result.secure_url : image,
                public_id_image: (result && result.public_id) ? result.public_id : ''

            }).then(function (x) {
                if (x.id) {
                    // insert AlbumSong //

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

                    // Insert ArtistsAlbum //
                    // db.ArtistsAlbum.create({
                    //     artistsId: data.artists,
                    //     albumsId: x.id
                    // })
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
                    { model: db.Songs, as: 'SongInPlaylist' },
                    { model: db.Genres, as: 'PlaylistGenre', attributes: ['id', 'genresName'] },
                ],
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

let deleteSongInAlbum = (albumId, songId) => {
    return new Promise(async (resolve, reject) => {

        let song = await db.Songs.findOne({
            where: { id: songId },
            raw: false
        })
        let album = await db.Albums.findOne({
            where: { id: albumId },
            raw: false
        })
        if (song && album) {
            let timePlay = song.timePlay;
            album.albumTimeLength -= timePlay;

            await album.save();
            // Xoa bang trung gian //
            await db.AlbumSong.destroy({
                where: { albumsId: albumId, songId: songId }
            })

            resolve({
                errCode: 0,
                errMessage: "Delete song in album ok"
            })
        } else {
            resolve({
                errCode: 2,
                errMessage: "Album hoặc Bài hát không tồn tại"
            })
        }

    })
}

let createNewSongInAlbum = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let album = await db.Albums.findOne({
                where: { id: data.albumId },
                raw: false
            })

            let result = [];

            if (data.selectedSongs) {
                data.selectedSongs.map(item => {
                    album.albumTimeLength += item.timePlay;

                    let obj = {};
                    obj.albumsId = data.albumId;
                    obj.songId = item.value;
                    result.push(obj);
                })
                await db.AlbumSong.bulkCreate(result);
                await album.save();
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


let getEditAlbum = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let album = await db.Albums.findOne({
                where: { id: id },
                include: [
                    { model: db.Artists, as: 'AlbumOfArtists', attributes: ['id', 'fullName'] },
                    { model: db.Genres, as: 'AlbumGenre', attributes: ['id', 'genresName'] },
                ],
                raw: false,
                nest: true
            });

            resolve(album);
        } catch (e) {
            reject(e);
        }
    })
}

let updateAlbum = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email //
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    errMessage: 'Missing id'
                })
            } else {
                let album = await db.Albums.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (album) {

                    // Có truyền image //
                    if (data.image && data.fileName) {
                        if (album.image && album.public_id_image) // có lưu trong db //
                        {
                            // Xóa hình cũ //
                            await cloudinary.uploader.destroy(album.public_id_image, { invalidate: true, resource_type: "raw" },
                                function (err, result) { console.log(result) });

                        }
                        // upload cloud //
                        result = await uploadCloud(data.image, data.fileName);
                    }

                    album.albumName = data.albumName;

                    if (data.image && data.fileName) {
                        album.image = result.secure_url;
                        album.public_id_image = result.public_id;
                    }


                    await album.save();

                    resolve({
                        errCode: 0,
                        message: "Update album thanh cong"
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



let deleteAlbum = (id) => {
    return new Promise(async (resolve, reject) => {
        let album = await db.Albums.findOne({
            where: { id: id }
        })
        if (!album) {
            resolve({
                errCode: 2,
                errMessage: 'Album ko ton tai'
            })
        }

        if (album.image && album.public_id_image) {
            // Xóa hình cũ //
            await cloudinary.uploader.destroy(album.public_id_image, { invalidate: true, resource_type: "raw" },
                function (err, result) { console.log(result) });
        }

        // Xoa bang trung gian //
        await db.AlbumSong.destroy({
            where: { albumsId: id }
        })

        await db.ArtistsAlbum.destroy({
            where: { albumsId: id }
        });

        await db.Albums.destroy({
            where: { id: id }
        })
        resolve({
            errCode: 0,
            errMessage: "Delete song ok"
        })
    })
}



module.exports = {
    createNewPlaylist,
    getAllPlaylist
}