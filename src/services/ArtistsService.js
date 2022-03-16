import axios from '../axios';

// Móc API //

const getAllCountry = () => {
    return axios.get(`/api/get-all-country`)
}
const getAllArtists = () => {
    return axios.get(`/api/get-all-artists`)
}

const getEditArtists = (id) => {
    return axios.get(`/api/get-edit-artists?id=${id}`)
}

const getDetailArtists = (id) => {
    return axios.get(`/api/get-detail-artists?id=${id}`)
}

const createNewArtistsService = (data) => {
    return axios.post('/api/create-new-artists', data)
}

const editArtistsService = (data) => {
    return axios.put('/api/edit-artists', data);
}

const deleteArtistsService = (id) => {
    return axios.delete('/api/delete-artists', {
        data: {
            id: id
        }
    });
}

export {
    getAllCountry,
    createNewArtistsService,
    getAllArtists,
    deleteArtistsService,
    getEditArtists,
    editArtistsService,
    getDetailArtists
};