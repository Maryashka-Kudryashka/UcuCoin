import React from "react"
import { compose } from "ramda"
import { lifecycle, withProps } from "recompose"
import { connect } from "react-redux"

import { fetchUsers } from "../actions/users"
import { getAllUsers, getBalances, getCurrentUser } from "../reducers"

import Balances from "./Balances"
import Transactions from "./Transactions"
import TransactionForm from "./TransactionForm"

const TeacherPage = ({ users, currenUser }) => (
  <div>
    <TransactionForm users={users} currenUser={currenUser}/>
    <Transactions />
    <Balances users={users} />
  </div>
)

const enhancer = compose( 
  connect(
    state => ({
      users: getAllUsers(state),
      balances: getBalances(state) || {},
      currenUser: getCurrentUser(state),
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
  withProps(({ users, balances, currenUser }) => ({
    users: users.map(user => {
      let balanceObj = balances.find(b => b.address === user.address)
      let balance = balanceObj ? balanceObj.value : 0
      return { ...user, balance }
    }).filter(user => user._id != currenUser.result._id)
  }))
)

export default enhancer(TeacherPage)
