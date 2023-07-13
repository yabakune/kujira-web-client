import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Notification = {
  title?: string;
  body: string;
  caption?: string;
  response?: string;
  status?: "success" | "failure" | "pending";
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
