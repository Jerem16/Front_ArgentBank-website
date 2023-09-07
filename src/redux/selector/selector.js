export const selectToken = (state) => state.auth.token;
export const selectUserData = (state) => state.profile.userData;
export const selectUserName = (state) => state.profile.userData.userName;
export const selectFirstName = (state) => state.profile.userData.firstName;
export const selectLastName = (state) => state.profile.userData.lastName;
