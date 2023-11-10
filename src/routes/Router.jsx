import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/login/LoginPage";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import UserManager from "../pages/userManagment/UserManager";
import CreateCardPage from "../pages/cardEdit/CreateCardPage";
import EditCardPage from "../pages/cardEdit/EditCardPage";
import AuthGuard from "../Guard/AuthGuard";
import AuthGuardBiz from "../Guard/AuthGuardBiz";
import AboutPage from "../pages/about/AboutPage";
import MyCardsPage from "../pages/myCards/MyCardsPage";
import CardPage from "../pages/cardPage/CardPage";
import FavCardsPage from "../pages/favCards/FavCardsPage";
import CarPage from "../playground/memoTargil/CarPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={`${ROUTES.CARDEDIT}/:id`} element={<EditCardPage />} />
      <Route path={`${ROUTES.CARDPAGE}/:id`} element={<CardPage />} />
      <Route path={ROUTES.FAVCARDS} element={<FavCardsPage />} />
      <Route path={ROUTES.MYCARDS} element={<MyCardsPage />} />
      <Route
        path={ROUTES.CARDCREATE}
        element={
          <AuthGuard>
            <AuthGuardBiz>
              <CreateCardPage />
            </AuthGuardBiz>
          </AuthGuard>
        }
      />
      <Route path={ROUTES.USERMANAGER} element={<UserManager />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
