import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./redux/reduxSlice";
import rootSaga from "./redux/reduxSaga";

//create the saga middleware
const sagaMiddleware = createSagaMiddleware();

//configure the store with the reducer and middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
