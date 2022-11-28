import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer/reducerIndex";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

export const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default Store;