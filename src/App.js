import { ToastContainer } from "react-toastify";
import "./App.css";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <LayoutComponent>
      <ToastContainer />
      <Router />
    </LayoutComponent>
  );
};

export default App;
