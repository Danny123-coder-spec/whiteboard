import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/homepage/Home";

import WhiteboardPage from "./pages/WhiteboardPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard/:id" element={<WhiteboardPage />} />
        <Route path="/sign-in" element={<SignInPage/>} />
        <Route path="/sign-up" element={<SignUpPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
