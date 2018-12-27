import React from "react"
import { compose, defaultProps, withHandlers } from "recompose"
import { makeTransaction } from "../../actions/balances"
import { connect } from "react-redux"
import block from "../../helpers/BEM"
import "./Offers.scss"

const b = block("Offers")

const Offers = ({ products, formSubmission, currentUser }) => (
  <div className={b()}>
    <h3 className={b("header")}>
      Spend my coins!{" "}
      <span className={b("balance")}>
        <div className={b("label")}>Wallet Balance</div>
        <div>{currentUser.balance} UCU</div>
      </span>
    </h3>
    {products.map((product, id) => (
      <div className={b("offer")} key={id}>
        <div className={b("name")}>{product.name}</div>
        <div className={b("info")}>
          <span className={b("price")}>
            <span className={b("label")}>Price: </span>
            {product.price} UCU
          </span>
          <button value={product.price} onClick={ev => formSubmission(ev)} className={b("button")}>
            buy
          </button>
        </div>
      </div>
    ))}
  </div>
)

const enhancer = compose(
  defaultProps({
    products: [
      { name: "Winter school", price: "20" },
      { name: "Coffee with Hrytsak", price: "20" },
      { name: "Discount in Trapezna", price: "5" },
      { name: "Ability to smoke everywhere", price: "40" },
      { name: "Lecture with Prutyla", price: "10" },
      { name: "Ticket for conference", price: "10" }
    ],
    admin: "0xeea8F2465405331C7DB3D1EE441911b75E9EF93F"
  }),
  connect(
    null,
    dispatch => ({
      pushTransaction: (adress, value) => dispatch(makeTransaction(adress, value))
    })
  ),
  withHandlers({
    formSubmission: ({ admin, pushTransaction }) => ev => {
      if (admin && ev.target.value) {
        pushTransaction(admin, ev.target.value)
      }
    }
  })
)

export default enhancer(Offers)
