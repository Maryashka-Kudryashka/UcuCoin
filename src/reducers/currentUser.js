import { AUTH_USER_SUCCESS, AUTH_USER_START, AUTH_USER_LOGOUT, FETCH_USER_BALANCE } from "../helpers/actionTypes"

export const currentUser = (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER_START:
      return { user: null, fetching: true }
    case AUTH_USER_SUCCESS:
      return { user: action.user, fetching: false }
    case AUTH_USER_LOGOUT:
      return { user: null, fetching: false }
    case FETCH_USER_BALANCE:
      console.log(action, "RED")
      return  { user: {...state.user, balance: action.balance.value}, fetching: state.fetching}
    default:
      return state
  }
}

export const getCurrentUser = state => state.user
export const isAuthFetching = state => state.fetching

export default currentUser
