import React, { useState } from "react";
import "./css/contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contact from "/images/contact-us.svg";
// const apiUrl = import.meta.env.VITE_BASE_URL;
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

    console.log(res);

    const data = await res.json();

    // console.log(data);

    // if (res.status === 422) {
    if (res.status === 422 || !data) {
      toast.error("Invalid conatct  details", {
        toastId: "success1",
      });
      console.log("Invalid conatct  details");
      console.log(data);
    } else if (res.status !== 422) {
      toast.success("Message  has been sent Successfully", {
        toastId: "success2",
      });
      console.log("Message  has been sent Successfully");
    } else {
      toast.error("Some error ocurred");
    }
  };
  // console.log(`${apiUrl} and hello`);

  return (
    <>
      <div className="col-lg-12 mt-5 contact11" id="contact11">
        <div className="section-title text-center">
          <span className="subtitle">
            Here you can conatct and find me on different platforms
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
              <div className="email_phone">
                <span className="mail">
                  <b>Email</b>:  bablukumar09001@gmail.com
                </span>
                <br />

                <span className="phone">
                  <b>Phone</b>: +91 8920549001
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









          <div className="col-lg-6 contactbox2 form-group">
            <form
              id="contact_form"
              name="contact_form"
              // method="post"
              onSubmit={PostData}
            >
              <div class="mb-5 row">
                <div class="col">
                  <label> Name</label>
                  <input
                    type="text"
                    required
                    maxlength="50"
                    class="form-control"
                    id="first_name"
                    name="name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Your Name"
                  />
                  <span class="icon fa fa-user fa-lg"></span>
                </div>

              </div>
              <div class="mb-5 row">
                <div class="col">
                  <label> Subject</label>
                  <input
                    type="text"
                    required
                    maxlength="50"
                    class="form-control"

                    name="subject"
                    value={user.subject}
                    onChange={handleInputs}
                    placeholder="subject"
                  />
                  <span class="icon fa fa-user fa-lg"></span>
                </div>

              </div>
              <div class="mb-5 row">
                <div class="col">
                  <label for="email_addr">Email address</label>
                  <input
                    type="email"
                    required
                    maxlength="50"
                    class="form-control"
                    id="email_addr"
                    name="email"
                    placeholder="Your Email"
                    value={user.email}
                    onChange={handleInputs}
                  />
                  <span class="icon fa fa-envelope fa-lg"></span>
                </div>
                <div class="col">
                  <label for="phone_input">Phone</label>
                  <input
                    type="tel"
                    required
                    maxlength="50"
                    class="form-control"
                    id="phone_input"
                    name="mobile"
                    placeholder=" Phone Number"
                    value={user.mobile}
                    onChange={handleInputs}
                  />
                  <span class="icon fa fa-phone fa-lg"></span>
                </div>

              </div>
              <div class="mb-5">
                <label for="message">Message</label>
                <textarea
                  class="form-control"
                  id="message"
                  name="message"
                  rows="4"
                  value={user.message}
                  onChange={handleInputs}
                ></textarea>
              </div>
              <button
                name="submit"
                id="submit"
                type="submit"
                class="rn-btn main-btn-contact px-4 btn-lg"
              >
                SUBMIT
              </button>
            </form>
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
