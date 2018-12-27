import React from "react"
import { lifecycle, withProps, branch, renderNothing } from "recompose"
import { compose } from "ramda"
import { connect } from "react-redux"
import { fetchUserTransactions, fetchUsers } from "../../actions/users"
import { getAllUsers } from "../../reducers"

import block from "../../helpers/BEM"
import "./Transactions.scss"

const b = block("Transactions")

const Transactions = ({ transactions }) => (
  <div className={b()}>
    <div className={b("transactions")}>
      <h3 className={b("subheader")}>My transactions</h3>
      <div className={b("heading")}>
        <div className={b("col", ["first"])}>Status</div>
        <div className={b("col", ["second"])}>Date</div>
        <div className={b("col", ["third"])}>To/From</div>
        <div className={b("col", ["fourth"])}>Amount</div>
        <div className={b("col", ["fifth"])}>Issue</div>
        <div className={b("col", ["sixth"])}>Transaction ID</div>
      </div>
      {transactions.map((transaction, i) => (
        <div key={i} className={b("row")}>
          <div className={b("col", ["first"])}>{transaction.status}</div>
          <div className={b("col", ["second"])}>{transaction.date}</div>
          <div className={b("col", ["third"])}>
            {transaction.person}
            <div className={b("status")}>{transaction.direction}</div>
          </div>
          <div className={b("col", ["fourth"])}>{transaction.amount}</div>
          <div className={b("col", ["fifth"])}>Issue</div>
          <div className={b("col", ["sixth"])}>{transaction.id}</div>
        </div>
      ))}
    </div>
  </div>
)

const enhancer = compose(
  connect(
    state => ({
      users: getAllUsers(state)
    }),
    dispatch => ({
      userTransactions: address => dispatch(fetchUserTransactions(address)),
      allUsers: () => dispatch(fetchUsers())
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.userTransactions(this.props.currentUser.result.address)
      if (this.props.users.length === 0) {
        this.props.allUsers()
      }
    }
  }),
  branch(({ currentUser }) => !currentUser.transactions, renderNothing),
  withProps(({ currentUser, users }) => {
    const trans = currentUser.transactions.map(transaction => {
      const date = new Date(transaction.timeStamp * 1000)
      const personAddress =
        transaction.from === currentUser.result.address.toLowerCase() ? transaction.to : transaction.from
      const person = users.find(user => user.address.toLowerCase() === personAddress)
      return {
        status: "Confirmed",
        date:
          date.getFullYear() +
          "-" +
          date.getMonth() +
          "-" +
          date.getDay() +
          " " +
          date.getHours() +
          ":" +
          date.getSeconds(),
        person: person.name + " " + person.surname,
        direction: transaction.from === currentUser.result.address.toLowerCase() ? "Sent" : "Recieved",
        amount: transaction.value,
        id: transaction.hash
      }
    })
    return { transactions: trans }
    console.log(trans, "PROPSPF")
  })
)

export default enhancer(Transactions)
