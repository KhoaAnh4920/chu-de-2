import axios from '../axios';


const saveLikeSong = (data) => {
    //console.log('check data grom likesongservice: ', data)
    return axios.put('/api/save-song-like', data);
}
const getLikeSong = (id) => {
    return axios.get(`/api/get-song-like-by-idUser?id=${id}`)
}
export {
    saveLikeSong,
    getLikeSong
}; 