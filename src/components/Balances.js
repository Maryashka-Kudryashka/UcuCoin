import React from "react"
import { fetchUsers } from "../actions/users"
import { connect } from "react-redux"
import { getAllUsers } from "../reducers"
import { compose } from "ramda"
import { lifecycle } from "recompose"

import block from "../helpers/BEM"
import "../styles/Balances.scss"

const b = block("Balances")

const Balances = ({ users }) => (
  <div className={b()}>
    <div>It`s a page, where you can check balances of all students</div>
    {users.map(el => <div className={b("student")}>
      <label className={b("item")}>
        Name:
      <span> {el.name} </span>
      </label>
      <label className={b("item")}>
        Surname:
      <span>{el.surname}</span>
      </label>
      <label className={b("item")}>
        Balance:
      <span>{el.balance}</span>
      </label>
    </div> )}
  </div>
)

export default compose(
  connect(
    (state, props) => {
      const users = getAllUsers(state);
      return { users };
    },
    dispatch => ({
      allUsers: () => dispatch(fetchUsers())
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.allUsers()
    }
  })
)(Balances);
