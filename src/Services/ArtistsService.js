import e from "express";
import db from "../models/index";
require('dotenv').config();
var cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

let uploadCloud = (image, fName) => {
    return new Promise(async (resolve, reject) => {
        try {
            await cloudinary.uploader.upload(
                image,
                {
                    resource_type: "raw",
                    public_id: `image/artists/${fName}`,
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

let getAllCountry = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataCountry = await db.Country.findAll();

            if (dataCountry) {
                resolve({
                    errCode: 0,
                    dataCountry: dataCountry
                })
            } else {
                resolve({
                    errCode: 1,
                    dataCountry: []
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let createNewArtists = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = {};
            let image = '';
            if (data.image && data.fileName) {
                // upload cloud //
                result = await uploadCloud(data.image, data.fileName);
            } else {
                image = 'https://res.cloudinary.com/cdmedia/image/upload/v1646921892/image/avatar/Unknown_b4jgka.png';
            }

            await db.Artists.create({
                fullName: data.fullName,
                gender: data.gender,
                country: data.country,
                description: data.description,
                image: (result && result.secure_url) ? result.secure_url : image,
                public_id_image: (result && result.public_id) ? result.public_id : ''

            })

            resolve({
                errCode: 0,
                errMessage: 'OK'
            }); // return 

        } catch (e) {
            reject(e);
        }
    })
}

let getAllArtists = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Artists.findAll({
                include: [
                    { model: db.Country, as: 'ArtistsCountry' },
                ],
                order: [
                    ['id', 'DESC'],
                ],
                raw: true,
                nest: true
            });

            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getEditArtists = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let artists = await db.Artists.findOne({
                where: { id: id },
                include: [
                    { model: db.Country, as: 'ArtistsCountry' },
                ],
                raw: true,
                nest: true
            });

            resolve(artists);
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailArtists = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let artists = await db.Artists.findOne({
                where: { id: id },
                include: [
                    { model: db.Country, as: 'ArtistsCountry' },
                    { model: db.Songs, as: 'ArtistsForSong' },
                    { model: db.Albums, as: 'ArtistsForAlbums' },
                ],
                raw: false,
                nest: true
            });

            resolve(artists);
        } catch (e) {
            reject(e);
        }
    })
}

let updateArtists = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    errMessage: 'Missing id'
                })
            } else {
                let artists = await db.Artists.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (artists) {
                    let result = {};

                    // Có truyền image //
                    if (data.image && data.fileName) {
                        if (artists.image && artists.public_id_image) // có lưu trong db //
                        {
                            // Xóa hình cũ //
                            await cloudinary.uploader.destroy(artists.public_id_image, { invalidate: true, resource_type: "raw" },
                                function (err, result) { console.log(result) });

                        }
                        // upload cloud //
                        result = await uploadCloud(data.image, data.fileName);


                    }

                    artists.fullName = data.fullName;
                    artists.gender = data.gender;
                    artists.country = data.country;
                    artists.description = data.description;

                    if (data.image && data.fileName) {
                        artists.image = result.secure_url;
                        artists.public_id_image = result.public_id;
                    }


                    await artists.save();

                    resolve({
                        errCode: 0,
                        message: "Update artists thanh cong"
                    });

                } else {
                    resolve({
                        errorCode: 1,
                        errMessage: "Artists ko tim thay"
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

let deleteArtists = (id) => {
    return new Promise(async (resolve, reject) => {
        let artists = await db.Artists.findOne({
            where: { id: id }
        })
        if (!artists) {
            resolve({
                errCode: 2,
                errMessage: 'Nghệ sĩ ko ton tai'
            })
        }

        let song = await db.Songs.findAll({
            include: [
                { model: db.Artists, as: 'SongOfArtists', where: { id: id } },
            ],
            raw: true,
            nest: true
        });

        resolve({
            errCode: 3,
            errMessage: 'Không thể xóa ca sĩ đã có bài hát'
        })

        if (song && song.id) {
            resolve({
                errCode: 3,
                errMessage: 'Không thể xóa ca sĩ đã có bài hát'
            })
        } else {
            if (artists.image && artists.public_id_image) {
                // Xóa hình cũ //
                await cloudinary.uploader.destroy(artists.public_id_image, { invalidate: true, resource_type: "raw" },
                    function (err, result) { console.log(result) });
            }

            await db.Artists.destroy({
                where: { id: id }
            });
            resolve({
                errCode: 0,
                errMessage: "Delete artists ok"
            })
        }


    })
}



module.exports = {
    getAllCountry,
    createNewArtists,
    getAllArtists,
    getEditArtists,
    updateArtists,
    deleteArtists,
    getDetailArtists
}