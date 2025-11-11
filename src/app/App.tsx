import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from '../modules/landing-page/landing-page'
import Login from '../modules/auth/login'

function App() {
  return (
    <Routes>
      <Route path="/bangkit-cell" element={<Home />} />
      <Route path="/bangkit-cell/auth" element={<Login />} />
    </Routes>
  );
}

export default App
