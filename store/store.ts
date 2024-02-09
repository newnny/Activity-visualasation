import { configureStore } from "@reduxjs/toolkit";
import { activitySlice } from "./slices/activitiesSlice";
import { tokenSlice } from "./slices/tokenSlice";
//Creating a Redux Store per Request: makeStore function returns a new store for each reques
export const makeStore = () => {
  return configureStore({
    reducer: {
      activities: activitySlice.reducer,
      token: tokenSlice.reducer
    },
  })
}
/* we can infer the RootState and AppDispatch types from the return type of makeStore.*/

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


