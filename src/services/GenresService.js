import axios from '../axios';

// Móc API //

const getAllGenres = () => {
    return axios.get(`/api/get-all-genres`)
}

const getEditGenres = (id) => {
    return axios.get(`/api/get-edit-genres?id=${id}`)
}

const createNewGenresService = (data) => {
    return axios.post('/api/create-new-genres', data)
}

const editGenresService = (data) => {
    return axios.put('/api/edit-genres', data);
}

const deleteGenresService = (id) => {
    return axios.delete('/api/delete-genres', {
        data: {
            id: id
        }
    });
}

export {
    createNewGenresService,
    getAllGenres,
    getEditGenres,
    editGenresService,
    deleteGenresService
};