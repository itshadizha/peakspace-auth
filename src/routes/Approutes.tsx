import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "../page/MainPage";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import PrivateRoute from "./PrivatRoute";
import {} from "react-redux";
import { RootState } from "../store/store";
import { useAppSelector } from "../hooks/hooks";
import ResetPasswordPage from "../page/RestPassword";
import ForgotPassword from "../page/ForgotPassword";
import UserProfileComponent from "../components/UserProfile";

const Approutes: React.FC = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.auth.userInfo);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute
          component={<MainPage />}
          fallbackPath={"/signIn"}
          isAuth={isAuth}
        />
      ),
    },
    {
      path: "/signIn",
      element: (
        <PrivateRoute
          component={<SignIn />}
          fallbackPath={"/"}
          isAuth={!isAuth}
        />
      ),
    },
    {
      path: "/signUp",
      element: (
        <PrivateRoute
          component={<SignUp />}
          fallbackPath={"/"}
          isAuth={!isAuth}
        />
      ),
    },
    {
      path: "/auth/reset-password",
      element: <ResetPasswordPage />,
    },
    {
      path: "/forgot",
      element: <ForgotPassword />,
    },
    {
      path: "/user",
      element: <UserProfileComponent />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Approutes;
