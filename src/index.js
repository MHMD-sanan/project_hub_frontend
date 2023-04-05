import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Provider } from "react-redux";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import store from "./redux/store";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
