import React from "react"
import { compose } from "ramda"
import { lifecycle, withProps } from "recompose"
import { connect } from "react-redux"

import { fetchUsers } from "../../actions/users"
import { getAllUsers, getBalances, getCurrentUser } from "../../reducers"

import Balances from "../Balances/Balances"
import Transactions from "../Transactions/Transactions"
import TransactionForm from "../TransactionForm"
import block from "../../helpers/BEM"
import "./TeacherPage.scss"

const b = block("TeacherPage")

const TeacherPage = ({ users, currentUser }) => (
  <div className={b()}>
    <TransactionForm users={users} currenUser={currentUser} />
    <Transactions />
    <Balances users={users} />
  </div>
)

const enhancer = compose(
  connect(
    state => ({
      users: getAllUsers(state),
      balances: getBalances(state) || {},
      currentUser: getCurrentUser(state)
    }),
    dispatch => ({
      allUsers: () => dispatch(fetchUsers())
    })
  ),
  lifecycle({
    componentDidMount() {
      if (this.props.users.length === 0) {
        this.props.allUsers()
      }
    }
  }),
  withProps(({ users, balances, currentUser }) => ({
    users: users
      .map(user => {
        let balanceObj = balances.find(b => b.address === user.address)
        let balance = balanceObj ? balanceObj.value : 0
        return { ...user, balance }
      })
      .filter(user => user._id != currentUser.result._id)
  }))
)

export default enhancer(TeacherPage)
