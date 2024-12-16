import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthRoute } from "./util/AuthRoute";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          exact
          path="/login"
          name="Login Page"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          exact
          path="/register"
          name="Register Page"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />
        <Route
          path="/"
          name="Home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/todo"
          name="Todo"
          element={
            <AuthRoute>
              <Navbar />
              <Todo />
            </AuthRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </HashRouter>
  );
}

export default App;
