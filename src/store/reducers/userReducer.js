import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedInUser: false,
    userInfo: null,
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
                userInfo: null
            }

        default:
            return state;
    }
}

export default appReducer;