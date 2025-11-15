import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import History from "./Components/History";
import Signals from "./Components/Signals";
import Settings from "./Components/Settings";
import Assistant from "./Components/Assistant";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Logout from "./Components/Logout";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>

         <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="history" element={<History />} />
          <Route path="signals" element={<Signals />} />
          <Route path="settings" element={<Settings />} />
          <Route path="assistant" element={<Assistant />} />
          <Route path="profile" element={<Profile />} />
        </Route>

       
        <Route path="*" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}
