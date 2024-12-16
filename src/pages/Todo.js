import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [values, setValues] = useState({
    title: "",
  });
  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("jwtToken"),
      },
    });
    const result = await response.json();
    setTodoList(result);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("jwtToken"),
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.status === 422) {
        toast.error(result);
      } else {
        toast.success("Data Successfully Added");
        fetchData();
        setValues({ title: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/todo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("jwtToken"),
        },
      });
      const result = await response.json();
      if (response.status === 422) {
        toast.error(result);
      } else {
        toast.success("Data Successfully Deleted");
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <div className="body flex-grow-1 px-3 py-4">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col col-xxl-6">
              <div className="card p-4">
                <div className="card-body">
                  <form
                    className="row justify-content-around"
                    onSubmit={onSubmit}
                  >
                    <div className="col-sm mt-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new task"
                        name="title"
                        value={values.title}
                        onChange={onChange}
                      />
                    </div>
                    <div className="col-sm-2 text-center mt-2">
                      <button
                        type="submit"
                        className="btn btn-secondary col-12"
                      >
                        Add Task
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col col-xxl-6">
              <div className="card p-4 mt-4">
                <div className="card-body">
                  <div className="row">
                    {todoList &&
                      todoList.length &&
                      todoList.map((item) => (
                        <div key={item.id} className="col col-sm-4 col-12">
                          <div className="card p-4 mt-4">
                            <div className="card-body">
                              <h5 className="card-title text-center mb-4">
                                {item.title}
                              </h5>
                              <div className="row justify-content-center mt-2">
                                <button
                                  className="btn btn-danger col-6"
                                  onClick={() => onDelete(item.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
