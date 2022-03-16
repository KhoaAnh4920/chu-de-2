import axios from '../axios';

// Móc API //

const getAllPlaylist = () => {
    return axios.get(`/api/get-all-playlist`)
}

const getEditPlaylist = (id) => {
    return axios.get(`/api/get-edit-playlist?id=${id}`)
}

const getDetailPlaylist = (id) => {
    return axios.get(`/api/get-detail-playlist?id=${id}`)
}


const createNewPlaylistService = (data) => {
    return axios.post('/api/create-new-playlist', data)
}

const createNewSongInPlaylist = (data) => {
    return axios.post('/api/create-new-song-in-playlist', data)
}

const editPlaylistService = (data) => {
    return axios.put('/api/edit-playlist', data);
}

const deleteSongInPlaylist = (playlistId, songId) => {
    return axios.delete('/api/delete-song-in-playlist', {
        data: {
            playlistId,
            songId
        }
    });
}

const deletePlaylistService = (id) => {
    return axios.delete('/api/delete-playlist', {
        data: {
            id: id
        }
    });
}

export {
    createNewPlaylistService,
    getAllPlaylist,
    createNewSongInPlaylist,
    deleteSongInPlaylist,
    getEditPlaylist,
    editPlaylistService,
    deletePlaylistService,
    getDetailPlaylist
};