import React from "react"
import { compose } from "ramda"
import { connect } from "react-redux"

import Transactions from "./Transactions"
import RewardForm from "./RewardForm/RewardForm"
import { getCurrentUser } from "../reducers"

const StudentPage = ({ currentUser }) => (
  <div>
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
