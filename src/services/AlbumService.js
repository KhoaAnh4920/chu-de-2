import axios from '../axios';

// Móc API //

const getAllAlbums = () => {
    return axios.get(`/api/get-all-albums`)
}

const getEditAlbum = (id) => {
    return axios.get(`/api/get-edit-album?id=${id}`)
}

const createNewAlbumsService = (data) => {
    return axios.post('/api/create-new-albums', data)
}

const createNewSongInAlbum = (data) => {
    return axios.post('/api/create-new-song-in-albums', data)
}

const editAlbumService = (data) => {
    return axios.put('/api/edit-album', data);
}

const deleteSongInAlbum = (albumId, songId) => {
    return axios.delete('/api/delete-song-in-album', {
        data: {
            albumId,
            songId
        }
    });
}

const deleteAlbumsService = (id) => {
    return axios.delete('/api/delete-album', {
        data: {
            id: id
        }
    });
}

export {
    createNewAlbumsService,
    getAllAlbums,
    deleteSongInAlbum,
    createNewSongInAlbum,
    getEditAlbum,
    editAlbumService,
    deleteAlbumsService
};