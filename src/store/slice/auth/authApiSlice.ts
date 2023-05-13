import {apiSlice} from "../../../utils/api/slice";
import {IAuthData} from "../../../common/types/auth";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IAuthData, { email: string, password: string }>({
            query: (credentials: { email: string, password: string }) => ({
                url: "/auth/authorization",
                method: "POST",
                body: {...credentials}
            })
        }),
    })
})

export const {
    useLoginMutation
} = authApiSlice
