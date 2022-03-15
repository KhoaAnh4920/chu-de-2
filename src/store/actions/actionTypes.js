const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',

    //admin
    ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
    ADMIN_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',

    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    PROCESS_LOGOUT_USER: 'PROCESS_LOGOUT_USER',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    // FETCH ALBUMS //
    fetchAllAlbumsSuccess: 'fetchAllAlbumsSuccess',
    fetchAllAlbumsFailed: 'fetchAllAlbumsFailed',

    // FETCH Playlist
    fetchAllPlaylistsSuccess: 'fetchAllPlaylistsSuccess',
    fetchAllPlaylistsFailed: 'fetchAllPlaylistsFailed'
})

export default actionTypes;