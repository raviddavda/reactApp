import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/login/LoginPage";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import UserManager from "../pages/userManagment/UserManager";
import User1 from "../pages/userManagment/users/User1";
import User2 from "../pages/userManagment/users/User2";
import RenderPage9 from "../playground/memoTest/RenderPage9";
import CarPage from "../playground/memoTargil/CarPage";
import CreateCardPage from "../pages/cardEdit/CreateCardPage";
import EditCardPage from "../pages/cardEdit/EditCardPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={`${ROUTES.CARDEDIT}/:id`} element={<EditCardPage />} />
      <Route path={ROUTES.CARDCREATE} element={<CreateCardPage />} />
      <Route path={ROUTES.USERMANAGER} element={<UserManager />} />
      <Route path={ROUTES.USER1} element={<User1 />} />
      <Route path={ROUTES.USER2} element={<User2 />} />
      <Route path="l9">
        <Route path="rendertest" element={<RenderPage9 />} />
        <Route path="memotargil" element={<CarPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
