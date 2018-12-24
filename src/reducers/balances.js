import { FETCH_USERS_BALANCES } from "../helpers/actionTypes"

export const balances = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS_BALANCES:
      return [...action.balances]
    default:
      return state
  }
}

export const getBalances = state => state

export default balances
