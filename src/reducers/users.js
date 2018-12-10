import { combineReducers } from 'redux';
import {
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS
} from '../helpers/actionTypes';

export const allUsers = (state = [], action) => {
    console.log(action, "REDUCER<<<<<<<<<<<<<,,")
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return [
        ...action.users
      ].map(el => ({...el}))

    default:
        return state;
  }
};

export const fetching = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USERS_START:
          return {all:true}
        case FETCH_USERS_SUCCESS:
            return {all:false};
        default:
            return state;
    }
};

const users = combineReducers({
    allUsers,
    fetching
});

export const getAllUsers = (state) => state.allUsers;
export const isUsersFetching = (state) => state.fetching;

export default users;