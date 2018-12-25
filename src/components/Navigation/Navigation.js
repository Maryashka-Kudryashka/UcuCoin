import React from "react"
import { compose } from "ramda"
import { connect } from "react-redux"
import { authLogout } from "../../actions/users"
import block from "../../helpers/BEM"
import { ReactComponent as Logo } from "./coin.svg"
import SignOut from "../SignOut"
import { withHandlers, defaultProps, withStateHandlers } from "recompose"

import "./Navigation.scss"

const b = block("Navigation")

const Navigation = ({ user, logout, toggleVisibility, tooltipVisible }) => (
  <div className={b()}>
    <Logo className={b("image")} />
    <div className={b("logo")}>uku token</div>
    <div onClick={toggleVisibility}>
      <span className={b("username")}>
        {user.name} {user.surname}
      </span>
      <SignOut
        tooltipVisible={tooltipVisible}
        email={user.email}
        name={`${user.name} ${user.surname}`}
        handleClick={logout}
      />
    </div>
  </div>
)

const enhancer = compose(
  connect(
    null,
    dispatch => ({
      logout: () => dispatch(authLogout())
    })
  ),
  withStateHandlers(
    () => ({
      tooltipVisible: false
    }),
    {
      toggleVisibility: ({ tooltipVisible }) => () => ({ tooltipVisible: !tooltipVisible })
    }
  )
)

export default enhancer(Navigation)
