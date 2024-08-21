import Login from "./Login";
import Dashboard from "./Dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  console.log(code);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={code ? <Dashboard code={code} /> : <Navigate to="/login" />}
        />

        <Route
          path="/callback"
          element={
            code ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
