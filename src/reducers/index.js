import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import users, * as fromUsers from './users';
import balances, * as fromBalances from './balances';
import currentUser, * as fromCurrentUser from './currentUser';

export const getAllUsers = (state) => fromUsers.getAllUsers(state.users);
export const isUsersFetching = (state) => fromUsers.isUsersFetching(state.users);
export const getBalances = (state) => fromBalances.getBalances(state.balances);
export const getCurrentUser = (state) => fromCurrentUser.getCurrentUser(state.currentUser);

export default (history) => combineReducers({
  router: connectRouter(history),
  users,
  balances,
  currentUser
});
