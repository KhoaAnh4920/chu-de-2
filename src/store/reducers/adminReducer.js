import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    adminInfo: null,
    listAlbums: [],
    listPlaylist: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                adminInfo: action.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }

        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }

        case actionTypes.fetchAllAlbumsSuccess:
            state.listAlbums = action.dataAlbums;
            return {
                ...state,
            }
        case actionTypes.fetchAllAlbumsFailed:
            state.listAlbums = [];
            return {
                ...state,
            }

        case actionTypes.fetchAllPlaylistsSuccess:
            state.listPlaylist = action.dataPlaylist;
            return {
                ...state,
            }
        case actionTypes.fetchAllPlaylistsFailed:
            state.listAlbums = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default appReducer;