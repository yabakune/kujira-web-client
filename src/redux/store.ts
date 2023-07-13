import * as Saga from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import * as Sagas from "@/sagas";

import { entitiesReducer as entities } from "./entities-slice";
import { uiReducer as ui } from "./ui-slice";

const sagaMiddleware = createSagaMiddleware();

export const reduxStore = configureStore({
  reducer: { entities, ui },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
  devTools: process.env.NODE_ENV === "development",
});

export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

sagaMiddleware.run(function* () {
  yield Saga.all([Sagas.authSaga()]);
});
