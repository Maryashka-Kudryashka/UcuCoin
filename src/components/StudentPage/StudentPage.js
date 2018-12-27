import React from "react"
import { compose } from "ramda"
import { connect } from "react-redux"
import Transactions from "../Transactions"
import { getCurrentUser } from "../../reducers/index"
import block from "../../helpers/BEM"
import "./StudentPage.scss"
import Offers from "../Offers"

const b = block("StudentPage")

const StudentPage = ({ currentUser }) => (
  <div className={b()}>
    <Offers currentUser={currentUser} />
    <Transactions currentUser={currentUser} />
  </div>
)

const enhancer = compose(
  connect(
    state => ({
      currentUser: getCurrentUser(state)
    }),
    null
  )
)

export default enhancer(StudentPage)
