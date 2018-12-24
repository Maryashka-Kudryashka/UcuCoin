import React from "react"
import { NavLink } from "react-router-dom"
import { withRouter } from "react-router-dom"
import { compose } from "ramda"
import { branch, renderComponent, renderNothing } from "recompose"

import block from "../helpers/BEM"
import "../styles/Navigation.scss"

const b = block("Navigation")

const StudentNav = () => (
  <nav className={b()}>
    <NavLink to="/" exact className={b("link")}>
      Profile
    </NavLink>
    <NavLink to="/reward" className={b("link")}>
      Reward
    </NavLink>
  </nav>
)

const TeacherNav = () => (
  <nav className={b()}>
    <NavLink to="/" exact className={b("link")}>
      Profile
    </NavLink>
    <NavLink to="/balances" className={b("link")}>
      Balances
    </NavLink>
    <NavLink to="/transactions" className={b("link")}>
      Transactions
    </NavLink>
  </nav>
)

const Navigation = () => {}

const enhancer = compose(
  withRouter,
  branch(({ role }) => role === "student", renderComponent(StudentNav)),
  branch(({ role }) => role === "teacher", renderComponent(TeacherNav)),
  branch(({ role }) => role === "none", renderNothing())
)

export default enhancer(Navigation)
