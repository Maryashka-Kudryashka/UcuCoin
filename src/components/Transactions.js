import React from "react";
import { compose } from "ramda";
import { connect } from "react-redux";
import { withState, withHandlers, lifecycle } from "recompose";
import { fetchBalances, makeTransaction } from "../actions/balances";
import { getBalances } from "../reducers";

const Transactions = ({ setAdress, setValue, formSubmission, balances }) => {
  console.log(balances, "BALBAL");
  return (
    <div>
      <div>
        It`s a page, where you can see al your transactions and make new
        transactions
      </div>
      <div>
        {balances.map((balance, i) => (
          <div key={i}>
            <span>Adress: {balance.adress} </span>
            <span>Value: {balance.value}</span>
          </div>
        ))}
      </div>
      <form onSubmit={formSubmission}>
        <div />
        <div />
        <label>
          Adress:
          <input onChange={ev => setAdress(ev.target.value)} />
        </label>
        <label>
          Value:
          <input onChange={ev => setValue(ev.target.value)} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

const enhancedTransaction = compose(
  withState("value", "setValue"),
  withState("adress", "setAdress"),
  connect(
    state => ({
      balances: getBalances(state) || {}
    }),
    dispatch => ({
      fetchAllBalances: () => dispatch(fetchBalances()),
      pushTransaction: (adress, value) => dispatch(makeTransaction(adress, value))
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchAllBalances();
    }
  }),
  withHandlers({
    formSubmission: ({ adress, value, pushTransaction }) => ev => {
      ev.preventDefault();
      if (adress && value) {
        console.log("<<<<<submit")
        pushTransaction(adress, value)
      }
    }
  })
)(Transactions);

export default enhancedTransaction;
