import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

const main = () => {
  let store = configureStore({ reducer });
  // console.log(store.getState());

  let client = ReactDOM.createRoot(document.getElementById("root"));

  client.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

main();
