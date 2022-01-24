import { Route, Routes } from "react-router-dom";
import Error from "./components/Error/Error";
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
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<p>This route doesn't exist!!</p>} />
    </Routes>
  );
}

export default App;
