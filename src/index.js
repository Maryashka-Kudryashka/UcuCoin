import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";
import initStore from './initStore';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux';
import { ConnectedRouter } from 'connected-react-router'

const history = createBrowserHistory();
export const middleware = routerMiddleware(history);

ReactDOM.render(
    <Provider store={initStore(history)}>
      <ConnectedRouter history={history}>
       <Layout></Layout>
      </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
