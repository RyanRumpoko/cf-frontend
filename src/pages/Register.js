import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
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
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.status === 422) {
        toast.error(result);
      } else {
        toast.success("Successfully Registered");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-xxl-5">
            <div className="card p-4">
              <div className="card-body">
                <h1>Register</h1>
                <p className="text-medium-emphasis">Register your account</p>
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
                      type="text"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={onChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-success col-12">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
