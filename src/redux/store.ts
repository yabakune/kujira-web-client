import * as Saga from "redux-saga/effects";
import createSagaMiddleware from "@redux-saga/core";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import * as Sagas from "@/redux-saga";

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
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
