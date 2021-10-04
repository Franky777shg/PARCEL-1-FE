import React from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"
import App from "./App"

// Router DOM
import { BrowserRouter } from "react-router-dom"

// Redux
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"
import allReducers from "./redux/reducers"
const globalStore = createStore(allReducers, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <Provider store={globalStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
