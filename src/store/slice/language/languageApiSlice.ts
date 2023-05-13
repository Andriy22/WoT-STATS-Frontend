import {apiSlice} from "../../../utils/api/slice";

export const languageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserLanguage: builder.query<object, void>({
            query: () => "/account/get-user-language",
        }),
    }),
});

export const {
    useGetUserLanguageQuery
} = languageApiSlice;
