import React, { useState } from "react";
import "./css/contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contact from "/images/contact-us.svg";

const Contact = () => {
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, mobile, subject, message } = user;

    const res = await fetch("/clientdata", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        mobile,
        subject,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log(res);

    const data = await res.json();

    // console.log(data);

    // if (res.status === 422) {
    if (res.status === 422 || !data) {
      toast.error("Invalid conatct  details");
      console.log("Invalid conatct  details");
    } else if (res.status !== 422) {
      toast.success("Message  has been sent Successfully");
      console.log("Message  has been sent Successfully");
    } else {
      toast.error("Some error ocurred");
    }
  };

  return (
    <>
      <div className="col-lg-12 mt-5 contact11">
        <div className="section-title text-center">
          <span className="subtitle">
            Visit my portfolio and keep your feedback
          </span>
          <h2>Contact</h2>
        </div>
      </div>

      <div className="container container-fluid   text-center">
        <div className="row ">
          <div className="col col-sm-5 box-left-contact">
            <div className="contact-about-area">
              <div>
                <img className="thumbnail" src={contact} alt="contact-img" />
              </div>
              <div className="title-area">
                <h4 className="title">Bablu Kumar</h4>
              </div>
              <div className="description">
                <span className="phone">
                  Phone: <a href="+91 8920549001">+91 8920549001</a>
                </span>
                <br />
                <span className="mail">
                  Email: <a href="Bk559722@gmail.com">Bk559722@gmail.com</a>
                </span>
              </div>
              <div className="social-area">
                <div className="name">
                  <h5>FIND WITH ME</h5>
                </div>
                {/* social media */}
                <div>
                  <ul className="list-unstyled-contact d-flex justify-content-center justify-content-md-end justify-content-lg-center social-icon mb-3 mb-md-0">
                    <li>
                      <a
                        href="https://www.instagram.com/abhay__9001/"
                        target=" "
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/abhay559722/"
                        target=" "
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/babluku9001" target=" ">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/bablu-kumar-a0aa16231/"
                        target=" "
                      >
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/bablukumar9001" target=" ">
                        <i className="fab fa-github"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* contact form  */}
          <div className=" col-sm-6  box-right-contact">
            <div className="contact-form-wrapper">
              <div className="introduce">
                <form
                  className="rnt-contact-form rwt-dynamic-form row"
                  onSubmit={PostData}
                >
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="contact-phone">Name</label>
                      <input
                        className="form-control"
                        name="name"
                        id="contact-name"
                        type="text"
                        value={user.name}
                        autoComplete="off"
                        onChange={handleInputs}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="contact-phone">Phone Number</label>
                      <input
                        className="form-control"
                        name="mobile"
                        id="contact-phone"
                        type="number"
                        value={user.mobile}
                        onChange={handleInputs}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="contact-email">Email</label>
                      <input
                        className="form-control form-control-sm"
                        id="contact-email"
                        name="email"
                        value={user.email}
                        type="email"
                        onChange={handleInputs}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="subject">subject</label>
                      <input
                        className="form-control form-control-sm"
                        id="subject"
                        name="subject"
                        type="text"
                        value={user.subject}
                        onChange={handleInputs}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="contact-message">Your Message</label>
                      <textarea
                        name="message"
                        id="contact-message"
                        cols="30"
                        rows="8"
                        value={user.message}
                        onChange={handleInputs}
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <button
                      name="submit"
                      type="submit"
                      id="submit"
                      className="rn-btn main-btn-contact"
                    >
                      <span>SEND MESSAGE</span>
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

export default Contact;
