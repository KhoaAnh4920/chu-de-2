import axios from '../axios';

// Móc API //

const getAllPlaylist = () => {
    return axios.get(`/api/get-all-playlist`)
}

const getEditPlaylist = (id) => {
    return axios.get(`/api/get-edit-playlist?id=${id}`)
}

const getPlaylistByGenres = (id) => {
    return axios.get(`/api/get-playlist-by-genres?id=${id}`)
}

const getPlaylistByKeyword = (kw) => {
    return axios.get(`/api/get-playlist-by-keyword?kw=${kw}`)
}

const getDetailPlaylist = (id) => {
    return axios.get(`/api/get-detail-playlist?id=${id}`)
}

const getAllPlaylistByUserId = (id) => {
    return axios.get(`/api/get-all-playlist-by-userId?id=${id}`)
}

const getRandomPlaylist = () => {
    return axios.get(`/api/get-random-playlist`)
}


const createNewPlaylistService = (data) => {
    return axios.post('/api/create-new-playlist', data)
}

const handleCreateNewPlaylistUser = (data) => {
    return axios.post('/api/create-new-playlist-user', data)
}



const createNewSongInPlaylist = (data) => {
    return axios.post('/api/create-new-song-in-playlist', data)
}

const createNewSongInPlaylistForUser = (data) => {
    return axios.post('/api/create-new-song-in-playlist-for-user', data)
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

const removeSongInPlaylistForUser = (playlistId, songId) => {
    return axios.delete('/api/delete-song-in-playlist-for-user', {
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
    getDetailPlaylist,
    getRandomPlaylist,
    getPlaylistByKeyword,
    getPlaylistByGenres,
    handleCreateNewPlaylistUser,
    getAllPlaylistByUserId,
    createNewSongInPlaylistForUser,
    removeSongInPlaylistForUser
};