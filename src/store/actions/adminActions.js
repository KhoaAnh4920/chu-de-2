import actionTypes from './actionTypes';
import { createNewUserService, editUserService } from '../../services/UserService';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux';
import { createNewGenresService, editGenresService } from '../../services/GenresService';
import { createNewArtistsService, editArtistsService } from '../../services/ArtistsService';
import { createNewSongService, editSongService } from '../../services/SongService';
import { createNewAlbumsService, getAllAlbums, editAlbumService } from '../../services/AlbumService';
import { createNewPlaylistService, getAllPlaylist, editPlaylistService } from '../../services/PlaylistService'



export const adminLoginSuccess = (adminInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    adminInfo: adminInfo
})

export const adminLoginFail = () => ({
    type: actionTypes.ADMIN_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})



export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await createNewUserService(data);
            if (res && res.errCode == 0) {
                toast.success("Thêm người dùng mới thành công");
            } else {
                toast.error("Thêm thất bại");
            }
        } catch (e) {
            console.log(e);
            toast.error("Thêm thất bại");
        }
    }
}

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await editUserService(data);
            if (res && res.errCode == 0) {
                toast.success("Cập nhật thành công");
                dispatch(push('/admin/list-users'))
            } else {
                toast.error("Cập nhật thất bại");
            }
        } catch (e) {
            console.log(e);
            toast.error("Cập nhật thất bại");
        }
    }
}

export const createNewGenres = (data) => {
    return async (dispatch, getState) => {
        try {
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await createNewGenresService(data);
            if (res && res.errCode == 0) {
                toast.success("Thêm thể loại mới thành công");
            } else {
                toast.error("Thêm thất bại");
            }
        } catch (e) {
            console.log(e);
            toast.error("Thêm thất bại");
        }
    }
}

export const editGenres = (data) => {
    return async (dispatch, getState) => {
        try {
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await editGenresService(data);
            if (res && res.errCode == 0) {
                toast.success("Cập nhật thành công");
                dispatch(push('/admin/list-genres'))
            } else {
                toast.error("Cập nhật thất bại");
            }
        } catch (e) {
            console.log(e);
            toast.error("Cập nhật thất bại");
        }
    }
}

export const createNewArtists = (data) => {
    return async (dispatch, getState) => {
        try {
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await createNewArtistsService(data);
            if (res && res.errCode == 0) {
                toast.success("Thêm nghệ sĩ mới thành công");
            } else {
                toast.error("Thêm thất bại");
            }
        } catch (e) {
            console.log(e);
            toast.error("Thêm thất bại");
        }
    }
}

export const editArtists = (data) => {
    return async (dispatch, getState) => {
        try {
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await editArtistsService(data);
            if (res && res.errCode == 0) {
                toast.success("Cập nhật thành công");
                dispatch(push('/admin/list-artists'))
            } else {
                toast.error("Cập nhật thất bại");
            }
        } catch (e) {
            console.log(e);
            toast.error("Cập nhật thất bại");
        }
    }
}


export const createNewSong = (data) => {
    return async (dispatch, getState) => {
        try {
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await createNewSongService(data);
            if (res && res.errCode == 0) {
                toast.success("Thêm bài hát mới thành công");
            } else {
                toast.error("Thêm thất bại");
            }
        } catch (e) {
            console.log(e);
            toast.error("Thêm thất bại");
        }
    }
}

export const editSong = (data) => {
    return async (dispatch, getState) => {
        try {
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await editSongService(data);
            if (res && res.errCode == 0) {
                toast.success("Cập nhật thành công");
                dispatch(push('/admin/list-songs'))
            } else {
                toast.error("Cập nhật thất bại");
            }
        } catch (e) {
            console.log(e);
            toast.error("Cập nhật thất bại");
        }
    }
}


export const createNewAlbum = (data) => {
    return async (dispatch, getState) => {
        try {
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await createNewAlbumsService(data);
            if (res && res.errCode == 0) {
                toast.success("Thêm album thành công");
            } else {
                toast.error("Thêm thất bại");
            }
        } catch (e) {
            console.log(e);
            toast.error("Thêm thất bại");
        }
    }
}


export const fetchAllAlbums = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllAlbums();
            if (res && res.errCode == 0) {
                dispatch({
                    type: actionTypes.fetchAllAlbumsSuccess,
                    dataAlbums: res.albums
                })
            } else {
                dispatch(fetchAllAlbumsFailed());
            }

        } catch (e) {
            dispatch(fetchAllAlbumsFailed());
            console.log(e);
        }
    }

}

export const fetchAllAlbumsSuccess = (allRequiredData) => ({
    type: actionTypes.fetchAllAlbumsSuccess,
    data: allRequiredData
})

export const fetchAllAlbumsFailed = () => ({
    type: actionTypes.fetchAllAlbumsFailed
})

export const editAlbum = (data) => {
    return async (dispatch, getState) => {
        try {
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await editAlbumService(data);
            if (res && res.errCode == 0) {
                toast.success("Cập nhật thành công");
                dispatch(push('/admin/list-albums'))
            } else {
                toast.error("Cập nhật thất bại");
            }
        } catch (e) {
            console.log(e);
            toast.error("Cập nhật thất bại");
        }
    }
}


export const createNewPlaylist = (data) => {
    return async (dispatch, getState) => {
        try {
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await createNewPlaylistService(data);
            if (res && res.errCode == 0) {
                toast.success("Thêm playlist thành công");
            } else {
                toast.error("Thêm thất bại");
            }
        } catch (e) {
            console.log(e);
            toast.error("Thêm thất bại");
        }
    }
}


export const fetchAllPlaylist = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllPlaylist();
            if (res && res.errCode == 0) {
                dispatch({
                    type: actionTypes.fetchAllPlaylistsSuccess,
                    dataPlaylist: res.playlist
                })
            } else {
                dispatch(fetchAllPlaylistsFailed());
            }

        } catch (e) {
            dispatch(fetchAllPlaylistsFailed());
            console.log(e);
        }
    }

}

export const fetchAllPlaylistSuccess = (allRequiredData) => ({
    type: actionTypes.fetchAllPlaylistsSuccess,
    data: allRequiredData
})

export const fetchAllPlaylistsFailed = () => ({
    type: actionTypes.fetchAllPlaylistsFailed
})

export const editPlaylist = (data) => {
    return async (dispatch, getState) => {
        try {
            if (!data) {
                alert("Undefine");
                return
            }
            let res = await editPlaylistService(data);
            if (res && res.errCode == 0) {
                toast.success("Cập nhật thành công");
                dispatch(push('/admin/list-playlist'))
            } else {
                toast.error("Cập nhật thất bại");
            }
        } catch (e) {
            console.log(e);
            toast.error("Cập nhật thất bại");
        }
    }
}