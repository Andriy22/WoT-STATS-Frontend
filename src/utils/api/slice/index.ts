import {BaseQueryApi, createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../../../store";
import {logOut, setCredentials} from "../../../store/slice/auth/authSlice.ts";
import {IAuthData} from "../../../common/types/auth";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:7196/api',
    prepareHeaders: (headers, api): Headers => {
        const {access_token} = (api.getState as () => RootState)().auth

        if (access_token) {
            headers.set("Authorization", `Bearer ${access_token}`)
        }

        return headers;
    }
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const refreshToken = (api.getState() as RootState).auth.refresh_token; // Get refresh_token from the state
        const refreshArgs = { // Define new arguments for the refresh query
            url: "/auth/refresh",
            method: "POST",
            body: {RefreshToken: refreshToken}
        };
        const refreshResult = await baseQuery(refreshArgs, api, extraOptions);

        if (refreshResult?.data) {
            const response = refreshResult?.data as IAuthData;

            api.dispatch(setCredentials(response));

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut())
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
})
