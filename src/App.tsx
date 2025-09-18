import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import DefaultLayout from "./components/layout/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewData from "./pages/NewData";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<DefaultLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data/new" element={<NewData />} />
      </Route>
    </Routes>
  );
}

export default App;
