import React from "react"
import ReactDOM from "react-dom"
import Layout from "./components/Layout"
import initStore from "./initStore"
import { Provider } from "react-redux"
import { createBrowserHistory } from "history"
import { routerMiddleware } from "react-router-redux"
import { ConnectedRouter } from "connected-react-router"
import { connectSmartContracts } from "./api/smartContract"

import "./styles/common.css"

const history = createBrowserHistory()
export const middleware = routerMiddleware(history)
connectSmartContracts()
// recheckBalances()

ReactDOM.render(
  <Provider store={initStore(history)}>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
)
