import React from "react"
import { compose } from "ramda"
import { connect } from "react-redux"
import { withState, withHandlers, lifecycle } from "recompose"

import { makeTransaction } from "../actions/balances"
import { fetchUsers } from "../actions/users"
import { getAllUsers } from "../reducers"

const Transactions = ({ setSurname, setValue, formSubmission, balances }) => {
  return (
    <form onSubmit={formSubmission}>
      <label>
        Surname:
        <input onChange={ev => setSurname(ev.target.value)} />
      </label>
      <label>
        Value:
        <input onChange={ev => setValue(ev.target.value)} />
      </label>
      <button>Submit</button>
    </form>
  )
}

const enhancedTransaction = compose(
  withState("value", "setValue"),
  withState("surname", "setSurname"),
  connect(
    state => ({
      users: getAllUsers(state)
    }),
    dispatch => ({
      allUsers: () => dispatch(fetchUsers()),
      pushTransaction: (adress, value) => dispatch(makeTransaction(adress, value))
    })
  ),
  lifecycle({
    componentDidMount() {
      if (this.props.users.length === 0) {
        this.props.allUsers()
      }
    }
  }),
  withHandlers({
    formSubmission: ({ users, surname, value, pushTransaction }) => ev => {
      ev.preventDefault()
      let address = users.find(user => user.surname === surname).address || undefined
      if (address && value) {
        pushTransaction(address, value)
      }
    }
  })
)(Transactions)

export default enhancedTransaction
