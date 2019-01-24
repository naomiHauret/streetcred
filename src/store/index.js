import { createStore, compose, applyMiddleware } from "redux"
import { rootReducer as reducer } from "./symbiotes"

const middleware = applyMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = () => {
  return createStore(reducer, {}, composeEnhancers(middleware))
}
