import actionTypes from './actionTypes';
import { handleCreateNewPlaylistUser, getAllPlaylistByUserId } from '../../services/PlaylistService'
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';



export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})
export const processLogoutUser = () => ({
    type: actionTypes.PROCESS_LOGOUT_USER
})

export const playAllPlaylist = (listSongs, typeSong) => ({
    type: actionTypes.PLAY_ALL_PLAYLIST,
    listSongs: listSongs,
    typeSong: typeSong
})

export const createNewPlaylistUser = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log(data)
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await handleCreateNewPlaylistUser(data);

            if (res && res.errCode == 0) {
                dispatch(push(`/create-playlist/${res.playlistId}`))
                //  toast.success("Thêm playlist thành công");
            } else {
                toast.error("Thêm thất bại");
            }
        } catch (e) {
            console.log(e);
            //  toast.error("Thêm thất bại");
        }
    }
}


export const fetchAllPlaylistByUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let dataPlaylist = await getAllPlaylistByUserId(id);
            if (dataPlaylist && dataPlaylist.playlist) {
                dispatch({
                    type: actionTypes.SAVE_NEW_PLAYLIST,
                    dataPlaylist: dataPlaylist.playlist
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

}