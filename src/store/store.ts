import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slice/userSlice";
import { dashboardSlice } from "./slice/dashboardSlice";
import { loginSlice } from "./slice/loginSlice";

import { requestApi } from "./slice/requestApi";
import { newDataSlice } from "./slice/newDataSlice";

export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    dashboardSlice: dashboardSlice.reducer,
    requestApi: requestApi.reducer,
    loginSlice: loginSlice.reducer,
    newDataSlice: newDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      requestApi.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
