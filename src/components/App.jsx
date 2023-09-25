import "../styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { cartPath, homePath, myProfilePath, signInPath } from "../config";
import Homepage from "./Homepage";
import Onboarding from "./Onboarding";
import Cart from "./Cart";
import MyProfile from "./MyProfile";
// import Product from "./components/viewProduct";

const router = createBrowserRouter([
  { path: homePath, element: <Homepage /> },
  // { path: viewProductPath, element: <Product /> },
  { path: signInPath, element: <Onboarding /> },
  { path: cartPath, element: <Cart /> },
  { path: myProfilePath, element: <MyProfile /> },
]);

let App = () => {
  return <RouterProvider router={router} />;
};

export default App;
