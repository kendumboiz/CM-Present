import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005/" }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: `users`,
        method: "GET",
      }),
    }),

    getUserTeam: builder.query({
      query: (team) => {
        console.log("🚀 ~ file: userServices.js ~ line 16 ~ team", team);
        return {
          url: `users?team=${team}`,
          method: "GET",
        };
      },
    }),

    getDeletedUser: builder.query({
      query: () => ({
        url: `trash`,
        method: "GET",
      }),
    }),

    getDetaillUser: builder.query({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "GET",
      }),
    }),

    deleteUserFromTrash: builder.mutation({
      query: (userId) => ({
        url: `trash/${userId}`,
        method: "DELETE",
      }),
    }),

    deleteUserFromList: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
    }),

    postNewUser: builder.mutation({
      query: (data) => {
        console.log("🚀 ~ file: user.js ~ line 37 ~ data", data);

        return {
          url: `users`,
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    postDeletedUser: builder.mutation({
      query: (data) => {
        console.log("🚀 ~ file: user.js ~ line 37 ~ data", data);

        return {
          url: `trash`,
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    updateUser: builder.mutation({
      query: (data) => {
        console.log("🚀 ~ file: user.js ~ line 52 ~ data", data);

        return {
          url: `users/${data.id}`,
          method: "PUT",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllUserQuery,
  useGetDetaillUserQuery,
  useDeleteUserFromTrashMutation,
  useGetDeletedUserQuery,
  usePostNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserFromListMutation,
  usePostDeletedUserMutation,
  useGetUserTeamQuery,
} = userApi;
