import React from "react";
import { Switch, Route } from "react-router-dom"
import { withRouter } from "react-router-dom"

import Navigation from "./Navigation"
import Balances from "./Balances"
import Profile from "./Profile"
import Reward from "./Reward"
import Transactions from "./Transactions"

import  { initTokenWatcher } from "../actions/balances"

import block from "../helpers/BEM"
import { lifecycle } from "recompose"
import { compose } from "ramda"
import { connect } from "react-redux";


const b = block("Layout");

const Layout = () => {
  return (
    <div className={b()}>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Profile} />
        <Route path="/balances" component={Balances} />
        <Route path="/reward" component={Reward} />
        <Route path="/transactions" component={Transactions} />
      </Switch>
    </div>
  );
};

const enhancer = compose(
  withRouter,
  connect(
    null,
    dispatch => ({
      tokenWatcher: () => dispatch(initTokenWatcher()),
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.tokenWatcher()
    }
  })
);

export default enhancer(Layout);
