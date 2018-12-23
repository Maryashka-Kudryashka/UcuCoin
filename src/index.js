import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout"
import initStore from './initStore'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import { ConnectedRouter } from 'connected-react-router'
import { connectSmartContracts } from "./api/smartContract"
import { recheckBalances } from "./api/fetchContract"

const history = createBrowserHistory();
export const middleware = routerMiddleware(history);
connectSmartContracts()
// recheckBalances()

ReactDOM.render(
    <Provider store={initStore(history)}>
      <ConnectedRouter history={history}>
       <Layout></Layout>
      </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
