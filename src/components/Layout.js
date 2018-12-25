import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router-dom"
import { lifecycle, withProps, branch, renderComponent } from "recompose"
import { compose } from "ramda"
import { connect } from "react-redux"

import Navigation from "./Navigation"
import Balances from "./Balances"
import Profile from "./Profile"
import Reward from "./Reward"
import Transactions from "./Transactions"
import Login from "./Login"

import { initTokenWatcher } from "../actions/balances"
import { getCurrentUser } from "../reducers"

import block from "../helpers/BEM"
import Testing from "./Testing"

const b = block("Layout")

const TeacherRoute = ({ component: Component, role, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      role === "teacher" ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
)

const StudentRoute = ({ component: Component, role, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      role === "student" ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
)

const CommonRoute = ({ component: Component, role, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      role === "teacher" || role === "student" ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
)

const Layout = ({ role }) => {
  return (
    <div className={b()}>
      <Navigation role={role} />
      <Switch>
        <CommonRoute role={role} exact path="/" component={Profile} />
        <Route path="/login" component={Login} />
        <TeacherRoute role={role} path="/balances" component={Balances} />
        <StudentRoute role={role} path="/reward" component={Reward} />
        <TeacherRoute role={role} path="/transactions" component={Transactions} />
      </Switch>
    </div>
  )
}

const enhancer = compose(
  withRouter,
  connect(
    state => ({
      currenUser: getCurrentUser(state)
    }),
    dispatch => ({
      tokenWatcher: () => dispatch(initTokenWatcher())
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.tokenWatcher()
    }
  }),
  branch(({ currenUser }) => !currenUser, renderComponent(Login)), //!!!
  withProps(({ currenUser }) => ({
    role: currenUser ? currenUser.result.role : "none"
  }))
)

export default enhancer(Layout)
