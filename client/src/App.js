import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

import Register from "./pages/Register";
import SharedLayout from "./components/layout/SharedLayout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { Error } from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUser } from "./hooks/useUser";
import { useSelector } from "react-redux";
function App() {
  const user = useUser();
  const authState = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <ProtectedRoute isAllowed={authState?.authenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                isAllowed={authState?.authenticated && authState?.isAdmin}
              >
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
