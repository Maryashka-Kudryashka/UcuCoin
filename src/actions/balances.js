import * as fromApi from "../api/fetchContract"
import { FETCH_USERS_BALANCES, FETCH_USER_BALANCE } from "../helpers/actionTypes"
import { getUCUTransferEvent } from "../api/smartContract"
import { fetchUsers } from "./users"

export const fetchUsersBalances = balances => ({
  type: FETCH_USERS_BALANCES,
  balances
})

export const fetchUserBalance = balance => ({
  type: FETCH_USER_BALANCE,
  balance
})

export const fetchBalances = addresses => async dispatch => {
  let balances = await fromApi.recheckBalances(addresses)
  dispatch(fetchUsersBalances(balances))
}

export const fetchBalance = address => async dispatch => {
  let balance = await fromApi.recheckBalances(address)
  dispatch(fetchUserBalance(balance[0]))
}

export const makeTransaction = (adress, value) => async dispatch => {
  fromApi.fetchTransaction(adress, value)
}

export const initTokenWatcher = () => async dispatch => {
  let trasnferEvent = getUCUTransferEvent()
  trasnferEvent.watch(function(error, result) {
    if (!error) {
      dispatch(fetchUsers())
    } else {
      console.log(error)
    }
  })
}
