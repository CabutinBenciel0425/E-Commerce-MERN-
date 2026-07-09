import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { setupInterceptors } from "./lib/axiosInterceptor.js";
import App from "./App.jsx";

setupInterceptors();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster position="bottom-right" reverseOrder={true} />
    <App />
  </BrowserRouter>,
);
