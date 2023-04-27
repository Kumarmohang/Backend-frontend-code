import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer/mainReducer";

const composeEnhancers =
  /* process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? */ window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({
    trace: true,
    traceLimit: 25,
  }) || compose;
export default function configureStore() {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}
