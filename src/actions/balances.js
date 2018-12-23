import * as fromApi from "../api/fetchContract"
import { FETCH_USERS_BALANCES } from "../helpers/actionTypes"
import { getUCUTransferEvent } from "../api/smartContract"

export const fetchUsersBalances = balances => ({
  type: FETCH_USERS_BALANCES,
  balances
});

export const fetchBalances = () => async dispatch => {
  let balances = fromApi.recheckBalances();
  dispatch(fetchUsersBalances(balances));
};

export const makeTransaction = (adress, value) => async dispatch => {
  fromApi.fetchTransaction(adress, value);
};

export const initTokenWatcher = () => async dispatch => {
    console.log("WATCHER")
let trasnferEvent = getUCUTransferEvent()
  trasnferEvent.watch(function(error, result) {
    if (!error) {
        dispatch(fetchBalances());
    } else {
      console.log(error);
    }
  });
};
