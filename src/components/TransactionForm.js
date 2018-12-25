import React from "react"
import { compose } from "ramda"
import { connect } from "react-redux"
import { withState, withHandlers, withProps } from "recompose"
import { makeTransaction } from "../actions/balances"
import Select from 'react-select'

const TransactionsForm = ({ setAddress, setValue, setIssue, formSubmission, currenUser, options }) => (
  <form onSubmit={formSubmission} style={{ width: "200px", background: "#d3dae5", display: "inline-block" }}>
  <span>Wallet balance: {currenUser.balance} UCU </span>
    <label>
      Send to:
      <Select options={options} onChange={value => setAddress(value.value)}  />
    </label>
    <label>
      Issue:
      <input onChange={ev => setIssue(ev.target.value)} />
    </label>
    <label>
      Amount:
      <input onChange={ev => setValue(ev.target.value)} />
    </label>
    <button>Send</button>
  </form>
)

const enhancer = compose(
  withState("value", "setValue"),
  withState("address", "setAddress"),
  withState("issue", "setIssue"),
  connect(
    null,
    dispatch => ({
      pushTransaction: (adress, value) => dispatch(makeTransaction(adress, value))
    })
  ),
  withHandlers({
    formSubmission: ({ address, value, pushTransaction }) => ev => {
      ev.preventDefault()
      if (address && value) {
        pushTransaction(address, value)
      }
    }
  }),
  withProps(({ users }) => ({
      options: users.map(user => ({
          value: user.address,
          label: user.name + " " + user.surname
      }))
  }))
)

export default enhancer(TransactionsForm)
