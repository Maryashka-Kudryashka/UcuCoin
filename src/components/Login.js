import React from "react";
import { compose } from "ramda";
import { withHandlers, withState } from "recompose";

import { connect } from "react-redux";
import { authenticateUser } from "../actions/users";
import { getCurrentUser } from "../reducers";

const Login = ({ setEmail, setPassword, formSubmission }) => {
  return (
    <form onSubmit={formSubmission}>
      <input onChange={ev => setEmail(ev.target.value)} />
      <input onChange={ev => setPassword(ev.target.value)} />
      <button>Log in</button>
    </form>
  );
};

const enhancer = compose(
  withState("email", "setEmail"),
  withState("password", "setPassword"),
  connect(
    state => ({
      currenUser: getCurrentUser(state)
    }),
    dispatch => ({
      authenticate: (email, password) =>
        dispatch(authenticateUser(email, password))
    })
  ),
  withHandlers({
    formSubmission: ({ email, password, authenticate }) => ev => {
      ev.preventDefault();
      if (email && password) {
        authenticate(email, password);
      }
    }
  })
);

export default enhancer(Login);
