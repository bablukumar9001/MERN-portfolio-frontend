import React, { useState } from "react";
import ShowData from "./ShowData";
import "./css/modals.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modals = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    console.log(e);

    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = res.json();

    if (res.status === 422 || !data) {
      toast.error("Invalid credentials", {
        toastId: "error1",
      });
      console.log("Invalid credentials");
    } else if (res.status === 201) {
      toast.success("Login Successfully", {
        toastId: "error2",
      });

      navigate("/show");
    } else {
      toast.error(" Incorrect Password");
    }
  };

  const test = (e) => {
    console.log("this is working");
    window.alert(" working");
    navigate("/show");
  };

  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Admin
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* modal body */}
            <div className="modal-body">
              <div className=" col-sm-6  box-right-contact">
                <div className="contact-form-wrapper">
                  <div className="introduce">
                    <form
                      className="rnt-contact-form rwt-dynamic-form row"
                      id="contact-form"
                      onSubmit={loginUser}
                    >
                      <div className="col-lg-6-login">
                        <div className="form-group">
                          <label htmlFor="contact-phone">Email</label>
                          <input
                            className="form-control"
                            name="email"
                            id="contact-phone"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="contact-email">Password</label>
                          <input
                            className="form-control form-control-sm"
                            id="contact-email"
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <button
                          name="submit"
                          type="submit"
                          id="submit"
                          className="rn-btn main-btn-contact"
                        >
                          <span>Login</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-arrow-right"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* modal footer */}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Modals;
