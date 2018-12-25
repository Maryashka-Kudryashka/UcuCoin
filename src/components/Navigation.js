import React from "react"
import { compose } from "ramda"
import { connect } from "react-redux"

import { authLogout } from "../actions/users"
import block from "../helpers/BEM"
import "../styles/Navigation.scss"

const b = block("Navigation")

const Navigation = ({ user, logout }) => (
  <div>
    <span>LOGO</span>
    <div>
      <span>
        {user.name} {user.surname}
      </span>
      <span>{user.email}</span>
      <button onClick={logout}>LOGOUT</button>
    </div>
  </div>
)

const enhancer = compose(
  connect(
    null,
    dispatch => ({
      logout: () => dispatch(authLogout())
    })
  )
)

export default enhancer(Navigation)
