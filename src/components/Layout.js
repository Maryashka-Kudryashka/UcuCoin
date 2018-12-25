import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router-dom"
import { lifecycle, withProps, branch, renderComponent } from "recompose"
import { compose } from "ramda"
import { connect } from "react-redux"

import Navigation from "./Navigation"
import StudentPage from "./StudentPage"
import TeacherPage from "./TeacherPage"
import Loader from "./Loader";
import Login from "./Login"

import { initTokenWatcher } from "../actions/balances"
import { fetchCurrentUser } from "../actions/users"
import { getCurrentUser, isAuthFetching } from "../reducers"

import block from "../helpers/BEM"

const b = block("Layout")

const PrivateRoute = ({ component: Component, role, isAuthFetching, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthFetching !== false ? (
        <Loader />
      ) : role !== 'none' ? (
        <Component {...props} />
      ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
    }
  />
);

const Layout = ({ role, isAuthFetching, currenUser }) => {
  const component = role === 'teacher' ? TeacherPage : StudentPage;
  return (
    <div className={b()}>
      {role !== 'none' && <Navigation role={role} user={currenUser.result} />}
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" exact component={component} role={role} isAuthFetching={isAuthFetching}/>
      </Switch>
    </div>
  )
}

const enhancer = compose(
  withRouter,
  connect(
    state => ({
      currenUser: getCurrentUser(state),
      isAuthFetching: isAuthFetching(state)
    }),
    dispatch => ({
      tokenWatcher: () => dispatch(initTokenWatcher()),
      fetchCurrentUser: () => dispatch(fetchCurrentUser())
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.tokenWatcher()
    },
    componentWillMount() {
      if (!this.props.currenUser) {
        this.props.fetchCurrentUser();
      }
    }
  }),
  // branch(({ currenUser }) => !currenUser, renderComponent(Login)),
  withProps(({ currenUser }) => ({
    role: (currenUser && currenUser.result) ? currenUser.result.role : "none"
  }))
)

export default enhancer(Layout)
