import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Home from "./pages/homepage/Home";
import WhiteboardCard from "./components/WhiteboardCard";
import WhiteboardPage from "./pages/WhiteboardPage";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/whiteboard/:id" element={<WhiteboardPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
