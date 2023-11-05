import { Navigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const AuthGuardBiz = ({ children }) => {
  const token = localStorage.getItem("token");
  const dataFromToken = jwtDecode(token);
  if (dataFromToken.isBusiness === true) {
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
