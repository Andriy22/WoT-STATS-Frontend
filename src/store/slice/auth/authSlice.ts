import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthData, IAuthState, IAuthUserData} from "../../../common/types/auth";

const initialState: IAuthState = {
    user: {} as IAuthUserData,
    access_token: '',
    refresh_token: '',
    isLogged: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<IAuthData>) => {
            const {accessToken, refreshToken, user} = action.payload;

            state.user = user;
            state.access_token = accessToken;
            state.refresh_token = refreshToken;

            state.isLogged = true;

            localStorage.setItem("user-state-data", JSON.stringify(action.payload));
        },
        logOut: (state) => {
            state.access_token = '';
            state.refresh_token = '';

            state.isLogged = false;
        }
    }
})

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;
