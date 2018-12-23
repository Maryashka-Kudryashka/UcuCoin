import * as fromApi from '../api/fetch';
import {
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL
} from '../helpers/actionTypes';

export const fetchUsersStart = () => ({type: FETCH_USERS_START});

export const fetchUsersSuccess = (users) => ({type: FETCH_USERS_SUCCESS, users});

export const fetchUsersFail = () => ({type: FETCH_USERS_FAIL});

export const fetchUsers = () => async (dispatch) => {
    dispatch(fetchUsersStart())
    let users = await fromApi.allUsers()
    dispatch(fetchUsersSuccess(users))
};

