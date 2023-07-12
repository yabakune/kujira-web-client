import { configureStore } from "@reduxjs/toolkit";

import { entitiesReducer } from "./entities-slice";

export const reduxStore = configureStore({
  reducer: { entities: entitiesReducer },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
