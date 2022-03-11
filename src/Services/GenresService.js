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
                    public_id: `image/avatar/${fName}`,
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


let createNewGenres = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = {};
            if (data.image && data.fileName) {
                // upload clound //
                result = await uploadCloud(data.image, data.fileName);
            }
            await db.Genres.create({
                genresName: data.nameGenres,
                image: (result && result.secure_url) ? result.secure_url : '',
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

let getAllGenres = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let genres = await db.Genres.findAll();

            resolve(genres);
        } catch (e) {
            reject(e);
        }
    })
}


let getEditGenres = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let genres = await db.Genres.findOne({
                where: { id: id },

                raw: true,
                nest: true
            });

            resolve(genres);
        } catch (e) {
            reject(e);
        }
    })
}

let updateGenre = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email //
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    errMessage: 'Missing id'
                })
            } else {
                let genres = await db.Genres.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (genres) {

                    // Có truyền image //
                    if (data.image && data.fileName) {
                        if (genres.image && genres.public_id_image) // có lưu trong db //
                        {
                            // Xóa hình cũ //
                            await cloudinary.uploader.destroy(genres.public_id_image,
                                function (err, result) { console.log(result) });

                        }
                        // upload cloud //
                        result = await uploadCloud(data.image, data.fileName);


                    }

                    genres.genresName = data.nameGenres;

                    if (data.image && data.fileName) {
                        genres.image = result.secure_url;
                        genres.public_id_image = result.public_id;
                    }


                    await genres.save();

                    resolve({
                        errCode: 0,
                        message: "Update thể loại thanh cong"
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


let deleteGenres = (id) => {
    return new Promise(async (resolve, reject) => {
        let genres = await db.Genres.findOne({
            where: { id: id }
        })
        if (!genres) {
            resolve({
                errCode: 2,
                errMessage: 'Thể loại ko ton tai'
            })
        }

        if (genres.image && genres.public_id_image) {
            // Xóa hình cũ //
            await cloudinary.uploader.destroy(genres.public_id_image,
                function (err, result) { console.log(result) });
        }

        await db.Genres.destroy({
            where: { id: id }
        });
        resolve({
            errCode: 0,
            errMessage: "Delete genres ok"
        })
    })
}


module.exports = {
    createNewGenres,
    getAllGenres,
    getEditGenres,
    updateGenre,
    deleteGenres
}