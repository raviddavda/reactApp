import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const AdminGuard = ({ children }) => {
  const userData = useSelector((bigPie) => bigPie.authSlice.loggedIn);

  if (userData && userData.isAdmin) {
    return children;
  } else {
    toast.error("Accesable only by Admin Account", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return <Navigate to={ROUTES.HOME} replace={true} />;
  }
};

export default AdminGuard;
