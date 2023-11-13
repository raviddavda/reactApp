import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AuthGuardBiz = ({ children }) => {
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  if (userData && userData.isBusiness) {
    return children;
  } else {
    toast.error("Only a Business Account can do that!", {
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

export default AuthGuardBiz;
