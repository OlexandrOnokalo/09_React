import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </Provider>,
    // </StrictMode>,
);
