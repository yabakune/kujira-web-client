import * as Saga from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import authSaga from "@/sagas/auth.saga";
import usersSaga from "@/sagas/users.saga";
import logbooksSaga from "@/sagas/logbooks.saga";

import { entitiesReducer as entities } from "./entities-slice";
import { uiReducer as ui } from "./ui-slice";

const sagaMiddleware = createSagaMiddleware();

export const reduxStore = configureStore({
  reducer: { entities, ui },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV === "development",
});

export type ReduxStore = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

function* rootSaga() {
  yield Saga.all([authSaga(), usersSaga(), logbooksSaga()]);
}

sagaMiddleware.run(rootSaga);
