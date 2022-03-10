import actionTypes from './actionTypes';
import { createNewUserService, editUserService } from '../../services/UserService';
import { toast } from 'react-toastify';
import { push } from 'react-router-redux'



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