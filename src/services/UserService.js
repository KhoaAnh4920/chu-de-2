import axios from '../axios';

// Móc API //

const hanedleLoginAPI = (adminEmail, userPassword) => {
    return axios.post('/api/admin-login', { email: adminEmail, password: userPassword }) // req.body.email, req.body.password //
}

const hanedleLoginUser = (userEmail, userPassword) => {
    return axios.post('/api/user-login', { email: userEmail, password: userPassword }) // req.body.email, req.body.password //
}

const signUpNewUser = (data) => {
    return axios.post('/api/sign-up-new-user', data)
}


const getAllRoles = () => {
    return axios.get(`/api/get-roles`) // truyen API method GET 
}

const getAllUser = () => {
    return axios.get(`/api/get-all-user`)
}

const getEditUser = (id) => {
    return axios.get(`/api/get-edit-user?id=${id}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data);
}

const deleteUserService = (id) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: id
        }
    });
}

export {
    getAllRoles,
    createNewUserService,
    getAllUser,
    getEditUser,
    editUserService,
    deleteUserService,
    hanedleLoginAPI,
    hanedleLoginUser,
    signUpNewUser
};