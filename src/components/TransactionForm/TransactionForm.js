import React from "react"
import { compose } from "ramda"
import { connect } from "react-redux"
import { withState, withHandlers, withProps } from "recompose"
import { makeTransaction } from "../../actions/balances"
import Select from "react-select"

import block from "../../helpers/BEM"
import "./TransactionForm.scss"

const b = block("TransactionForm")

const TransactionsForm = ({ setAddress, setValue, setIssue, formSubmission, currenUser, options }) => (
  <form
    className={b()}
    onSubmit={formSubmission}
    style={{ width: "200px", background: "#d3dae5", display: "inline-block" }}
  >
    <div className={b("label")}>Wallet balance: </div>
    <div className={b("balance")}>{currenUser.balance} UCU</div>
    <label className={b("label")}>Send to:</label>
    <Select className={b("input")} options={options} onChange={value => setAddress(value.value)} />

    <label className={b("label")}>Issue:</label>
    <input className={b("input")} onChange={ev => setIssue(ev.target.value)} />

    <label className={b("label")}>Amount:</label>
    <input className={b("input")} onChange={ev => setValue(ev.target.value)} />

    <button className={b("button")}>Send</button>
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
