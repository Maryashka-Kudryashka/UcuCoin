import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import users, * as fromUsers from './users';

export const getAllUsers = (state) => fromUsers.getAllUsers(state.users);
export const isUsersFetching = (state) => fromUsers.isUsersFetching(state.users);

export default (history) => combineReducers({
  router: connectRouter(history),
  users
});
