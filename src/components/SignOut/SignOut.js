import React from "react"
import block from "../../helpers/BEM"

import "./SignOut.scss"

const b = block("SignOut")

const SignOut = ({ email, name, handleClick, tooltipVisible }) => (
  <div className={b(tooltipVisible && ["visible"])}>
    <div className={b("name")}>{name}</div>
    <div className={b("email")}>{email}</div>
    <button className={b("button")} onClick={handleClick}>
      sign out
    </button>
  </div>
)

export default SignOut
