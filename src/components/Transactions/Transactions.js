import React from "react"
import { lifecycle, withProps } from "recompose"
import { compose } from "ramda"
import { connect } from "react-redux"
// import { getUserTransactions } from "../../reducers"
import { fetchUserTransactions } from "../../actions/users"

import block from "../../helpers/BEM"
import "./Transactions.scss"

const b = block("Transactions")

const Transactions = () => {
  return <div className={b()}>HERE GOES USER TRANSACTIONS</div>
}

const enhancer = compose(
  connect(
    state => ({
    //   transactions: getUserTransactions(state)
    }),
    dispatch => ({
      userTransactions: () => dispatch(fetchUserTransactions())
    })
  ),
  lifecycle({
    componentDidMount() {
    //   if (this.props.users.length === 0) {
    //     this.props.userTransactions()
    //   }
        this.props.userTransactions()

    }
  })
)

export default enhancer(Transactions)
