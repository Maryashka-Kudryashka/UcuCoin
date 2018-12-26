import * as fromApi from "../api/fetch"
import * as fromApiContract from "../api/fetchContract"
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  AUTH_USER_START,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILED,
  AUTH_USER_LOGOUT
} from "../helpers/actionTypes"
import { fetchBalances, fetchBalance } from "./balances"
import { push } from "react-router-redux"

export const fetchUsersStart = () => ({ type: FETCH_USERS_START })

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  users
})

export const authUserStart = () => ({ type: AUTH_USER_START })

export const authUserSuccess = user => ({ type: AUTH_USER_SUCCESS, user })

export const authUserFailed = () => ({ type: AUTH_USER_FAILED })

export const authUserLogout = () => ({ type: AUTH_USER_LOGOUT })

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
  dispatch(authUserSuccess(user))
  dispatch(push("/"))
}

export const fetchCurrentUser = () => async dispatch => {
  dispatch(authUserStart())
  const user = await fromApi.fetchCurrentUser()
  if (user.status !== "NOT LOGINED") {
    dispatch(fetchBalance([user.result.address]))
  }
  dispatch(authUserSuccess(user))
}

export const authLogout = () => async dispatch => {
  const user = await fromApi.userLogout()
  dispatch(authUserLogout())
}

export const fetchUserTransactions = () => async dispatch => {
  const transactions = await fromApiContract.getData("0x68F074d6eFF2EfEDDa3dC36BeB1E238C3117c90F")
  console.log(transactions.result[0], "TRAANS")
}
