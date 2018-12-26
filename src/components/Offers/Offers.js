import React from "react"
import { compose, defaultProps } from "recompose"
import block from "../../helpers/BEM"
import "./Offers.scss"

const b = block("Offers")

const Offers = ({ products }) => (
  <div className={b()}>
    {products.map((product, id) => (
      <div key={id}>
        {product.name} {product.price}
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
