import axios from '../axios';

// Móc API //


const getAllSong = (limit) => {
    return axios.get(`/api/get-all-songs?limit=${limit}`)
}

const getAllSongsByArtists = (artistsId) => {
    return axios.get(`/api/get-all-songs-by-artists?artistsId=${artistsId}`)
}

const getAllSongsByGenres = (genresId) => {
    return axios.get(`/api/get-all-songs-by-genres?genresId=${genresId}`)
}

const getAllSongsByArtistsGenres = (artistsId, genresId) => {
    return axios.get(`/api/get-all-songs-by-artists-genres?artistsId=${artistsId}&genresId=${genresId}`)
}

const getEditSong = (id) => {
    return axios.get(`/api/get-edit-song?id=${id}`)
}

const getDetailSong = (id) => {
    return axios.get(`/api/get-detail-song?id=${id}`)
}

const createNewSongService = (data, config) => {
    return axios.post('/api/create-new-song', data, config)
}

const editSongService = (data, config) => {
    return axios.put('/api/edit-song', data, config);
}

const deleteSongService = (id) => {
    return axios.delete('/api/delete-song', {
        data: {
            id: id
        }
    });
}
const editSongCount = (data) => {
    return axios.put('/api/edit-song-count', data)
}
const saveHistorySong = (data) => {
    return axios.put('/api/save-song-history', data)
}
const getHistorySong = (id) => {
    return axios.get(`/api/get-song-history-by-idUser?id=${id}`)
}
export {
    saveHistorySong,
    getHistorySong
}; 