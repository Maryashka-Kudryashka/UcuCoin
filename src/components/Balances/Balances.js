import React from "react"
import block from "../../helpers/BEM"
import "./Balances.scss"

const b = block("Balances")

const Balances = ({ users = [], role }) => (
  <div className={b()}>
    <h3 className={b("header")}>{role === "admin" ? "Teachers" : "Students"}</h3>
    {users.map(el => (
      <>
        <div key={el.email} className={b("student")}>
          <div className={b("name")}>
            {el.name} {el.surname}
          </div>
          <div className={b("email")}>{el.email}</div>
          <div className={b("balance-label")}>
            Wallet balance: <span className={b("balance")}>{el.balance} UCU</span>
          </div>
        </div>
      </>
    ))}
  </div>
)

export default Balances
