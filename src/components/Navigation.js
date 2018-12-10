import React from "react"
import { NavLink } from "react-router-dom"
import { withRouter } from "react-router-dom"
import block from "../helpers/BEM"
import "../styles/Navigation.scss"

const b = block("Navigation")

const Navigation = () => (
  <nav className={b()}>
    <NavLink to="/" exact className={b("link")}>Profile</NavLink>
    <NavLink to="/balances" className={b("link")}>Balances</NavLink>
    <NavLink to="/reward" className={b("link")}>Reward</NavLink>
    <NavLink to="/transactions" className={b("link")}>Transactions</NavLink>
  </nav>
);

export default withRouter(Navigation);
