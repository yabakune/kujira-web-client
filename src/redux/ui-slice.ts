import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Notification = {
  title?: string;
  body: string;
  caption?: string;
  response?: string;
  status?: "success" | "failure" | "pending";
  timeout: number;
};

export type UIState = {
  notification: Notification;
};

const initialState: UIState = {
  notification: {
    title: "",
    body: "",
    caption: "",
    response: "",
    status: "pending",
    timeout: 0,
  },
};

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    resetNotification: (state: UIState) => {
      state.notification = {
        title: "",
        body: "",
        caption: "",
        response: "",
        status: "pending",
        timeout: 0,
      };
    },
    setNotification: (state: UIState, action: PayloadAction<Notification>) => {
      state.notification = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
