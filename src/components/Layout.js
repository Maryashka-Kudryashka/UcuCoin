import React from "react"
import { Switch, Route } from "react-router-dom"
import { withRouter } from "react-router-dom"

import Navigation from "./Navigation"
import Balances from "./Balances"
import Profile from "./Profile"
import Reward from "./Reward"
import Transactions from "./Transactions"

import block from "../helpers/BEM"


const b = block("Layout")

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
  )
}

export default withRouter(Layout)
