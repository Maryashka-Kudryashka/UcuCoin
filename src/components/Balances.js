import React from "react"
import { fetchUsers } from "../actions/users"
import { connect } from "react-redux"
import { getAllUsers } from "../reducers"
import { compose } from "ramda"
import { lifecycle } from "recompose"

const Balances = ({ users }) => (
  <div>
    <div>It`s a page, where you can check balances of all students</div>
    <span>{users}</span>
  </div>
);

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
