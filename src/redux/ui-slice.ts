import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Notification = {
  title?: string;
  body: string;
  caption?: string;
  response?: string;
};

export type UIState = {
  notification: Notification;
};

const initialState: UIState = {
  notification: { body: "" },
};

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setNotification: (state: UIState, action: PayloadAction<Notification>) => {
      state.notification = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
