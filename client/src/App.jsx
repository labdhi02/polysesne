// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home";
import Auth from "./pages/Auth";
import Home2 from "./pages/Home2";
import Track from "./pages/Track";
import Test from "./pages/Test";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="home2" element={<Home2 />} />
        <Route path="track" element={<Track />} />
        <Route path="test" element={<Test />} />
        <Route path="result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
