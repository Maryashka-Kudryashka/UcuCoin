import React from "react";
import { compose } from "ramda";
import { lifecycle, withProps } from "recompose";
import { connect } from "react-redux";

import { fetchUsers } from "../actions/users";
import { getAllUsers, getBalances } from "../reducers";

import block from "../helpers/BEM";
import "../styles/Balances.scss";

const b = block("Balances");

const Balances = ({ users }) => {
  console.log(users, "USERS");
  return (
    <div className={b()}>
      {users.map((el) => (
        <div className={b("student")}>
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
        </div>
      ))}
    </div>
  );
};

export default compose(
  connect(
    state => ({
      users: getAllUsers(state),
      balances: getBalances(state) || {}
    }),
    dispatch => ({
      allUsers: () => dispatch(fetchUsers())
    })
  ),
  lifecycle({
    componentDidMount() {
      if (this.props.users.length === 0) {
        this.props.allUsers();
      }
    }
  }),
  withProps(({ users, balances }) => ({
    users: users.map(user => {
      let balanceObj = balances.find(b => b.address === user.address);
      let balance = balanceObj ? balanceObj.value : 0;
      return { ...user, balance };
    })
  }))
)(Balances);
