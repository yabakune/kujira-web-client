import * as Saga from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import * as Sagas from "@/sagas";

import { entitiesReducer } from "./entities-slice";
import { uiReducer } from "./ui-slice";

function* rootSaga() {
  yield Saga.all([Sagas.authSaga(), Sagas.usersSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

export const reduxStore = configureStore({
  reducer: {
    entities: entitiesReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV === "development",
});

sagaMiddleware.run(rootSaga);

export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
