import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./components/App";
import store from "./app/store";
import "./index.css";
import ToggleTheme from "./utils/ToggleTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ToggleTheme>
                <App />
            </ToggleTheme>
        </Provider>
    </React.StrictMode>
);
