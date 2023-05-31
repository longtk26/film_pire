import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import store from "./app/store";
import "./index.css";
import ToggleTheme from "./utils/ToggleTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ToggleTheme>
                    <App />
                </ToggleTheme>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
