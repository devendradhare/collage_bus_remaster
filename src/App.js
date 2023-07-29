import Navbar from "./components/Navbar";
import Login from "./components/Login";
import About from "./components/About";
import Home from "./components/Home";
import LiveMap from "./components/LiveMap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<h3>page is in production </h3>} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<LiveMap />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
