import React from "react"
import { compose } from "ramda"
import { branch, renderNothing, withProps } from "recompose"
import block from "../helpers/BEM"
import "../styles/Balances.scss"

const b = block("Balances")

const Balances = ({ users = [] }) => (
  <div className={b()} style={{ width: "1000px", background: "#d3dae5", "margin-top": "20px" }}>
    Students
    {users.map(el => (
      <div className={b("student")}>
        <span className={b("item")}> {el.name} {el.surname}</span>
        <span className={b("item")}>{el.email}</span>
        <span className={b("item")}>Wallet balance: {el.balance} UCU</span>
      </div>
    ))}
  </div>
)

export default Balances
