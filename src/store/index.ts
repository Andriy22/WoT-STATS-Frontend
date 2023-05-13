import {configureStore} from "@reduxjs/toolkit";
import authReducer from './slice/auth/authSlice.ts'
import {apiSlice} from "../utils/api/slice";
import {authLocalStorageMiddleware} from "./middleware/auth";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware).concat(authLocalStorageMiddleware),
    devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;
