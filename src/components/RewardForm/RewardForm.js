import React from "react"
import { compose } from "ramda"
import { connect } from "react-redux"
import { withState, withHandlers, withProps } from "recompose"
import { makeTransaction } from "../../actions/balances"

import block from "../../helpers/BEM"
import "./RewardForm.scss"

const b = block("RewardForm")

const RewardForm = ({ setValue, setIssue, formSubmission, currenUser }) => (
  <form
    className={b()}
    onSubmit={formSubmission}
    style={{ width: "300px" }}
  >
    <div className={b("label")}>Wallet balance: </div>
    <div className={b("balance")}>{currenUser.balance} UCU</div>

    <label className={b("label")}>Issue:</label>
    <input className={b("input")} onChange={ev => setIssue(ev.target.value)} />

    <label className={b("label")}>Amount:</label>
    <input className={b("input")} onChange={ev => setValue(ev.target.value)} />

    <button className={b("button")}>Spend</button>
  </form>
)

const enhancer = compose(
  withState("value", "setValue"),
  withState("issue", "setIssue"),
  connect(
    null,
    dispatch => ({
      pushTransaction: (adress, value) => dispatch(makeTransaction(adress, value))
    })
  ),
  withProps({
    admin: "0x68F074d6eFF2EfEDDa3dC36BeB1E238C3117c90F"
  }),
  withHandlers({
    formSubmission: ({ admin, value, pushTransaction }) => ev => {
      ev.preventDefault()
      if (admin && value) {
        pushTransaction(admin, value)
      }
    }
  })
)

export default enhancer(RewardForm)
