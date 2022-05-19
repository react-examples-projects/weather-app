import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./Pages/404";
import App from "./Pages/App";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} index />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
