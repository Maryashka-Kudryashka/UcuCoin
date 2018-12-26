import React from "react"
import block from "../../helpers/BEM"
import "./Transactions.scss"

const b = block("Transactions")

const Transactions = () => (
  <div className={b()}>
    <div className={b("transactions")}>
      <h3 className={b("subheader")}>My transactions</h3>
      <div className={b("heading")}>
        <div className={b("col", ["first"])}>Status</div>
        <div className={b("col", ["second"])}>Date</div>
        <div className={b("col", ["third"])}>To/From</div>
        <div className={b("col", ["fourth"])}>Amount</div>
        <div className={b("col", ["fifth"])}>Issue</div>
        <div className={b("col", ["sixth"])}>Transaction ID</div>
      </div>
      <div className={b("row")}>
        <div className={b("col", ["first"])}>Status</div>
        <div className={b("col", ["second"])}>Date</div>
        <div className={b("col", ["third"])}>
          To/From<div className={b("status")}>Received</div>
        </div>
        <div className={b("col", ["fourth"])}>Amount</div>
        <div className={b("col", ["fifth"])}>Issue</div>
        <div className={b("col", ["sixth"])}>Transaction ID</div>
      </div>
      <div className={b("row")}>
        <div className={b("col", ["first"])}>Status</div>
        <div className={b("col", ["second"])}>Date</div>
        <div className={b("col", ["third"])}>
          To/From<div className={b("status")}>Received</div>
        </div>
        <div className={b("col", ["fourth"])}>Amount</div>
        <div className={b("col", ["fifth"])}>Issue</div>
        <div className={b("col", ["sixth"])}>Transaction ID</div>
      </div>
    </div>
  </div>
)

export default Transactions
