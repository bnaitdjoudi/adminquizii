import {applyMiddleware, createStore} from "redux";

import rootReducer from "../reducers/index";

const store = createStore(rootReducer);
console.log("initial store:"+JSON.stringify(store.getState()));
export default store;