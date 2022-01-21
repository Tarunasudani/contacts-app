import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/LandingPage/Login";
import Register from "./components/LandingPage/Register";
import Phonebook from "./components/Phonebook/Phonebook";



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<Phonebook />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1 style={{textAlign: "center"}}>This route doesn't exist!!</h1>} />
    </Routes>
  );
}

export default App;
