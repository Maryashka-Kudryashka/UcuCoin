import React from "react"
import { compose } from "ramda"
import { withHandlers, withState } from "recompose"

import { connect } from "react-redux"
import { authenticateUser } from "../../actions/users"
import { getCurrentUser } from "../../reducers/index"

import "./Login.css"

const Login = ({ setEmail, setPassword, formSubmission }) => {
  return (
    <div className={"Login"}>
      <form className={"Login__form"} onSubmit={formSubmission}>
          <h1 className={"Login__header"}>ucu token</h1>
          <input className={"Login__input"} placeholder={"email"} onChange={ev => setEmail(ev.target.value)} />
        <input className={"Login__input"} placeholder={"password"} onChange={ev => setPassword(ev.target.value)} />
        <button className={"Login__button"}>login</button>
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
