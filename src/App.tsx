import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/homepage/Home";

import WhiteboardPage from "./pages/WhiteboardPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard/:id" element={<WhiteboardPage />} />
        <Route path="/sign-in" element={<Login/>} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
