// export const selectStatus = (state) => state.users.status;

// export const selectToken = (state) => state.users.token;

// export const selectUserData = (state) => state.users.userData;
// export const selectUserName = (state) => state.users.userData.userName;
// export const selectFirstName = (state) => state.users.userData.firstName;
// export const selectLastName = (state) => state.users.userData.lastName;

// export const selectError = (state) => state.users.error;
import { createSelector } from 'reselect';

export const selectStatus = (state) => state.users.status;

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