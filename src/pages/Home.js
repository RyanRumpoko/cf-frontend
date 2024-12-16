import React, { useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [values, setValues] = useState({
    message: "",
  });
  const [conversation, setConversation] = useState();
  const checkThread = localStorage.getItem("threadId");
  const getThread = async () => {
    try {
      const response = await fetch("http://localhost:4000/ai/thread", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (result.threadId) {
        localStorage.setItem("threadId", result.threadId);
        return result;
      } else {
        toast.error(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!checkThread) {
      const thread = await getThread();

      const response = await fetch("http://localhost:4000/ai/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: values.message,
          threadId: thread.threadId,
        }),
      });
      const result = await response.json();
      if (response.status === 422) {
        toast.error(result);
      } else {
        setConversation(result);
        setValues({ message: "" });
      }
    } else {
      const response = await fetch("http://localhost:4000/ai/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: values.message,
          threadId: checkThread,
        }),
      });
      const result = await response.json();
      if (response.status === 422) {
        toast.error(result);
      } else {
        setConversation(result);
        setValues({ message: "" });
      }
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
                        placeholder="Ask anything"
                        name="message"
                        value={values.message}
                        onChange={onChange}
                      />
                    </div>
                    <div className="col-sm-2 text-center mt-2">
                      <button
                        type="submit"
                        className="btn btn-secondary col-12"
                      >
                        ASK
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {conversation && conversation.length && (
            <div className="row justify-content-center">
              <div className="col col-xxl-6">
                <div className="card p-4 mt-4">
                  <div className="card-body">
                    {conversation.map((item, idx) => (
                      <p key={idx}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
