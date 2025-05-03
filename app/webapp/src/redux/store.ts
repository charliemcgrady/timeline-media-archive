import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userDataReducer from "~/redux/user-data/reducers";
import mediaFilterReducer from "~/redux/media-filter/reducers";
import authenticationReducer from "~/redux/authentication/reducers";

const rootReducer = combineReducers({
  userData: userDataReducer,
  mediaFilter: mediaFilterReducer,
  authentication: authenticationReducer
});

declare global {
  interface Window {
    // Does not exist on Window, so typescript will complain without this line
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof rootReducer>;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
