import React from "react"
import { compose, defaultProps } from "recompose"
import block from "../../helpers/BEM"
import "./Offers.scss"

const b = block("Offers")

const Offers = ({ products }) => (
  <div className={b()}>
    <h3 className={b("header")}>Spend my coins!</h3>
    {products.map((product, id) => (
      <div className={b("offer")} key={id}>
        <div className={b("name")}>{product.name}</div>
        <div className={b("info")}>
          <span className={b("price")}>
            <span className={b("label")}>Price: </span>
            {product.price} UCU
          </span>
          <button className={b("button")}>buy</button>
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
    ]
  })
)

export default enhancer(Offers)
