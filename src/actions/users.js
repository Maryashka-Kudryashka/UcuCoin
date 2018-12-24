import * as fromApi from "../api/fetch"
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  AUTH_USER_START,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILED
} from "../helpers/actionTypes"
import { fetchBalances } from "./balances"

export const fetchUsersStart = () => ({ type: FETCH_USERS_START })

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  users
})

export const authUserStart = () => ({ type: AUTH_USER_START })

export const authUserSuccess = user => ({ type: AUTH_USER_SUCCESS, user })

export const authUserFailed = () => ({ type: AUTH_USER_FAILED })

export const fetchUsers = () => async dispatch => {
  dispatch(fetchUsersStart())
  let users = await fromApi.allUsers()
  let addresses = users.map(user => user.address)
  dispatch(fetchBalances(addresses))
  dispatch(fetchUsersSuccess(users))
}

export const authenticateUser = (email, password) => async dispatch => {
  dispatch(authUserStart())
  const user = await fromApi.authUser(email, password)
  console.log(user, "AUTH")
  dispatch(authUserSuccess(user))
}
