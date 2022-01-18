import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Phonebook from "./components/Phonebook/Phonebook";



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<Phonebook />} />
    </Routes>
  );
}

export default App;
