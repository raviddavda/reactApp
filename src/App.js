import { ToastContainer } from "react-toastify";
import "./App.css";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import "react-toastify/dist/ReactToastify.css";
import useAutoLogin from "./hooks/useAutoLogin1";
import { useEffect } from "react";

const App = () => {
  const autoLogin = useAutoLogin();
  useEffect(() => {
    autoLogin();
  }, []);
  return (
    <LayoutComponent>
      <ToastContainer />
      <Router />
    </LayoutComponent>
  );
};

export default App;
