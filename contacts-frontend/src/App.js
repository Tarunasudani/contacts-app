import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/LandingPage/Login";
import Register from "./components/LandingPage/Register";
import Phonebook from "./components/Phonebook/Phonebook";



function App() {
  return (
    <Routes>
      <Route path="/" element={sessionStorage.getItem("sessionToken") ? <Phonebook />: <LandingPage />} />
      <Route path="/app" element={<Phonebook />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
