import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./Pages/404";
import Home from "./Pages/Home";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
 