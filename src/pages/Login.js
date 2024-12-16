import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (result.username && result.accessToken) {
        localStorage.setItem("jwtToken", result.accessToken);
        navigate("/todo");
      } else {
        toast.error(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const registerFunction = () => {
    navigate("/register");
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-xxl-5">
            <div className="card p-4">
              <div className="card-body">
                <h1>Login</h1>
                <p className="text-medium-emphasis">Sign In to your account</p>
                <form onSubmit={onSubmit}>
                  <div className="input-group mb-3">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      name="username"
                      value={values.username}
                      onChange={onChange}
                    />
                  </div>
                  <div className="input-group mt-3 mb-4">
                    <span className="input-group-text">@</span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={onChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary col-12">
                    LOGIN
                  </button>
                </form>
                <button
                  onClick={registerFunction}
                  className="btn btn-success col-12 mt-4"
                >
                  REGISTER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
