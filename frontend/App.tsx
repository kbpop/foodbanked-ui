import { Routes, Route } from "react-router";
import Landing from "./components/Landing/Landing.tsx";
import Login from "./components/Login/Login.tsx";
import Register from "./components/Register/Register.tsx";
import { Table } from "./components/dashboard/Table.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/table" element={<Table />} />
    </Routes>
  );
}

export default App;
