import { combineReducers } from "redux"
import { AUTH_USER_SUCCESS } from "../helpers/actionTypes"

export const currentUser = (state = null, action) => {
  switch (action.type) {
    case AUTH_USER_SUCCESS:
      return action.user
    default:
      return state
  }
}

export const getCurrentUser = state => state

export default currentUser
