import React from "react"
import { compose } from "ramda"
import { withHandlers, withState } from "recompose"
import { connect } from "react-redux"
import { authenticateUser } from "../../actions/users"
import { getCurrentUser } from "../../reducers/index"
import block from "../../helpers/BEM"

import "./Login.scss"

const b = block("Login")

const Login = ({ setEmail, setPassword, formSubmission }) => {
  return (
    <div className={b()}>
      <form className={b("form")} onSubmit={formSubmission}>
        <h1 className={b("header")}>ucu token</h1>
        <input className={b("input")} placeholder={"email"} type={"email"} onChange={ev => setEmail(ev.target.value)} />
        <input
          className={b("input")}
          placeholder={"password"}
          type={"password"}
          onChange={ev => setPassword(ev.target.value)}
        />
        <button className={b("button")}>login</button>
      </form>
    </div>
  )
}

const enhancer = compose(
  withState("email", "setEmail"),
  withState("password", "setPassword"),
  connect(
    state => ({
      currenUser: getCurrentUser(state)
    }),
    dispatch => ({
      authenticate: (email, password) => dispatch(authenticateUser(email, password))
    })
  ),
  withHandlers({
    formSubmission: ({ email, password, authenticate }) => ev => {
      ev.preventDefault()
      if (email && password) {
        authenticate(email, password)
      }
    }
  })
)

export default enhancer(Login)
