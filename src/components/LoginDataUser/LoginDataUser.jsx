// import React, { useState, useEffect } from "react";
// import { getUserProfile, rejected, auth } from "../../redux/reducers/authSlice";
// import { useNavigate } from "react-router-dom";
// import {
//     selectToken,
//     selectUserData,
//     selectIsLoading,
// } from "../../redux/selector/selector";
// import { useDispatch, useSelector } from "react-redux";
// import { clearStoredToken } from "../../redux/reducers/token";
// import "./loginForm.scss";
// import Loader from "../Loader/Loader";

// function LoginDataUser() {
//     const token = useSelector(selectToken);
//     const data = useSelector(selectUserData);
//     const isLoading = useSelector(selectIsLoading);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (token && !data) {
//             dispatch(getUserProfile())
//                 .then(() => {
//                     // dispatch(auth(true));
//                     navigate("/user");
//                 })
//                 .catch((error) => {
//                     dispatch(rejected(error));
//                     alert("Connection error. Please try Again.");
//                 });
//         }
//     }, [dispatch, token, data, navigate]);
//     return (
//         <section className="sign-in-content">
//             <i className="fa fa-user-circle sign-in-icon"></i>
//             <h1>Sign In</h1>
//             {isLoading ? (
//                 <Loader />
//             ) : (
//                 <form>
//                     <div className="input-wrapper">
//                         <label htmlFor="email">Email</label>
//                         <input type="email" id="email" />
//                     </div>
//                     <div className="input-wrapper">
//                         <label htmlFor="password">Password</label>
//                         <input type="password" id="password" />
//                     </div>
//                     <div className="input-remember">
//                         <input type="checkbox" id="remember-me" />
//                         <label htmlFor="remember-me">Remember me</label>
//                     </div>

//                     <button type="submit" className="sign-in-button">
//                         Sign In
//                     </button>
//                 </form>
//             )}
//         </section>
//     );
// }

// export default LoginDataUser;
