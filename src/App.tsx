import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapSelect from "./pages/MapSelect";
import Board from "./pages/Board";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapSelect />} />
        <Route path="/map/:mapKey" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}