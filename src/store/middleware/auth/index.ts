import {PayloadAction} from "@reduxjs/toolkit";
import {logOut, setCredentials} from "../../slice/auth/authSlice.ts";

export const authLocalStorageMiddleware = () => (next: (action: PayloadAction) => void) => {
    return (action: PayloadAction) => {
        if (action.type === setCredentials.type) {
            localStorage.setItem("user-auth-data", JSON.stringify(action.payload))
        }

        if (action.type === logOut.type) {
            localStorage.removeItem("user-auth-data")
        }

        return next(action);
    };
}
