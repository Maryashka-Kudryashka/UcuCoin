import React from "react"
import { compose } from "ramda"
import { connect } from "react-redux"
import Transactions from "../Transactions"
import RewardForm from "../RewardForm"
import { getCurrentUser } from "../../reducers/index"
import block from "../../helpers/BEM"
import "./StudentPage.scss"

const b = block("StudentPage")

const StudentPage = ({ currentUser }) => (
  <div className={b()}>
    <RewardForm currenUser={currentUser} />
    <Transactions />
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
