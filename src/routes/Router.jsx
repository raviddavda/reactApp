import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/login/LoginPage";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import CreateCardPage from "../pages/cardEdit/CreateCardPage";
import EditCardPage from "../pages/cardEdit/EditCardPage";
import AuthGuard from "../Guard/AuthGuard";
import AuthGuardBiz from "../Guard/AuthGuardBiz";
import AboutPage from "../pages/about/AboutPage";
import MyCardsPage from "../pages/myCards/MyCardsPage";
import CardPage from "../pages/cardPage/CardPage";
import FavCardsPage from "../pages/favCards/FavCardsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import AdminGuard from "../Guard/AdminGuard";
import UpdateUser from "../pages/profile/UpdateUser";
import UserManagerPage from "../pages/userManagment/UserManagerPage";
import NotLoggedInGuard from "../Guard/NotLoggedInGuard";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route
        path={ROUTES.REGISTER}
        element={
          <NotLoggedInGuard>
            <RegisterPage />
          </NotLoggedInGuard>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <NotLoggedInGuard>
            <LoginPage />
          </NotLoggedInGuard>
        }
      />
      <Route
        path={`${ROUTES.CARDEDIT}/:id`}
        element={
          <AuthGuard>
            <AuthGuardBiz>
              <EditCardPage />
            </AuthGuardBiz>
          </AuthGuard>
        }
      />
      <Route path={`${ROUTES.CARDPAGE}/:id`} element={<CardPage />} />
      <Route
        path={ROUTES.FAVCARDS}
        element={
          <AuthGuard>
            <FavCardsPage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <AuthGuard>
            <AuthGuardBiz>
              <MyCardsPage />
            </AuthGuardBiz>
          </AuthGuard>
        }
      />
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
      <Route
        path={`${ROUTES.PROFILE}/:id`}
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTES.PROFILEEDIT}/:id`}
        element={
          <AuthGuard>
            <UpdateUser />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <AuthGuard>
            <AdminGuard>
              <UserManagerPage />
            </AdminGuard>
          </AuthGuard>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
