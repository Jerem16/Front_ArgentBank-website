import { createSelector } from "reselect";

export const selectIsLoading = createSelector(
    (state) => state.users.isLoading,
    (status) => status
);

export const selectAuth = createSelector(
    (state) => state.users.isAuth,
    (status) => status
);

export const selectStatus = createSelector(
    (state) => state.users.status,
    (status) => status
);

export const selectToken = createSelector(
    (state) => state.users.token,
    (token) => token
);

export const selectUserData = createSelector(
    (state) => state.users.userData,
    (userData) => userData
);

export const selectUserName = createSelector(
    (state) => state.users.userData.userName,
    (userName) => userName
);

export const selectFirstName = createSelector(
    (state) => state.users.userData.firstName,
    (firstName) => firstName
);

export const selectLastName = createSelector(
    (state) => state.users.userData.lastName,
    (lastName) => lastName
);

export const selectError = createSelector(
    (state) => state.users.error,
    (error) => error
);

