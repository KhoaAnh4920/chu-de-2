import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedInUser: false,
    userInfo: null,
    listSongs: [],
    listPlaylistOfUser: [],
    typeSong: ''
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedInUser: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedInUser: false,
                userInfo: null
            }

        case actionTypes.PROCESS_LOGOUT_USER:
            return {
                ...state,
                isLoggedInUser: false,
                userInfo: null,
                listPlaylistOfUser: null
            }

        case actionTypes.PLAY_ALL_PLAYLIST:
            state.listSongs = action.listSongs;
            state.typeSong = action.typeSong
            return {
                ...state,
            }

        case actionTypes.SAVE_NEW_PLAYLIST:
            state.listPlaylistOfUser = action.dataPlaylist;
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default appReducer;