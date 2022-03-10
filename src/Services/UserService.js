import db from "../models/index";
import bcrypt from 'bcryptjs';
require('dotenv').config();
var salt = bcrypt.genSaltSync(10);
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



let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }

    })
}
let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { email: email }
            })
            if (user)
                resolve(true);
            else
                resolve(false);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email //
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: "Email da ton tai"
                })
            } else {
                let hashPass = await hashUserPassword(data.password);
                let result = {};
                let avatar = '';
                if (data.avatar && data.fileName) {
                    // upload cloud //
                    result = await uploadCloud(data.avatar, data.fileName);
                } else {
                    avatar = 'https://res.cloudinary.com/cdmedia/image/upload/v1646921892/image/avatar/Unknown_b4jgka.png';
                }

                await db.Users.create({
                    email: data.email,
                    password: hashPass,
                    fullName: data.fullName,
                    isActive: true,
                    gender: data.gender.value,
                    birthday: data.birthday,
                    userName: data.userName,
                    roleId: data.roles.value,
                    avatar: (result && result.secure_url) ? result.secure_url : avatar,
                    public_id_image: (result && result.public_id) ? result.public_id : ''

                })

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


let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email //
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    errMessage: 'Missing id'
                })
            } else {
                let user = await db.Users.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (user) {

                    // Có truyền image //
                    if (data.avatar && data.fileName) {
                        if (user.avatar && user.public_id_image) // có lưu trong db //
                        {
                            // Xóa hình cũ //
                            await cloudinary.uploader.destroy(user.public_id_image,
                                function (err, result) { console.log(result) });

                        }
                        // upload cloud //
                        result = await uploadCloud(data.avatar, data.fileName);


                    }

                    user.fullName = data.fullName;
                    user.birthday = data.birthday;
                    user.gender = data.gender.value;
                    user.roleId = data.roles.value;

                    if (data.avatar && data.fileName) {
                        user.avatar = result.secure_url;
                        user.public_id_image = result.public_id;
                    }


                    await user.save();

                    resolve({
                        errCode: 0,
                        message: "Update user thanh cong"
                    });

                } else {
                    resolve({
                        errorCode: 1,
                        errMessage: "User ko tim thay"
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




let getAllRoles = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRoles = await db.Roles.findAll();

            if (dataRoles) {
                resolve({
                    errCode: 0,
                    dataRoles: dataRoles
                })
            } else {
                resolve({
                    errCode: 1,
                    dataRoles: []
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}


let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Users.findAll({
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Roles, as: 'UserRoles' },
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


let getEditUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Users.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Roles, as: 'UserRoles' },
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

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.Users.findOne({
            where: { id: id }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: 'User ko ton tai'
            })
        }

        if (user.avatar && user.public_id_image) {
            // Xóa hình cũ //
            await cloudinary.uploader.destroy(user.public_id_image,
                function (err, result) { console.log(result) });
        }

        await db.User.destroy({
            where: { id: id }
        });
        resolve({
            errCode: 0,
            errMessage: "Delete user ok"
        })
    })
}



module.exports = {
    getAllRoles,
    createNewUser,
    getAllUser,
    getEditUser,
    updateUser,
    deleteUser
}