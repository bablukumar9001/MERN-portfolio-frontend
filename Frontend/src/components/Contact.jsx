import React, { useState, useEffect } from "react";
import "./css/contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contact from "/images/contact-us.svg";
// const apiUrl = import.meta.env.VITE_BASE_URL;
const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('#contact11');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!user.name.trim()) errors.name = "Name is required";
    if (!user.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email)) errors.email = "Email is invalid";
    if (!user.mobile.trim()) errors.mobile = "Phone number is required";
    else if (!/^\d{10}$/.test(user.mobile)) errors.mobile = "Phone number must be 10 digits";
    if (!user.subject.trim()) errors.subject = "Subject is required";
    if (!user.message.trim()) errors.message = "Message is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({...formErrors, [name]: ""});
    }
  };

  const PostData = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
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

      const data = await res.json();

      if (res.status === 422 || !data) {
        toast.error("Invalid contact details", {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (res.status !== 422) {
        toast.success("Message has been sent successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        // Reset form after successful submission
        setUser({
          name: "",
          mobile: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  // console.log(`${apiUrl} and hello`);

  return (
    <section className={`contact-section ${isVisible ? 'visible' : ''}`} id="contact11">
      <div className="container">
        <div className="section-title text-center fade-in">
          <span className="subtitle">Get In Touch</span>
          <h2>Contact Me</h2>
          <div className="title-bar"></div>
          <p className="contact-intro">
            Feel free to reach out to me for any questions, project inquiries, or collaboration opportunities.
            I'm always open to discussing new projects and ideas.
          </p>
        </div>

        <div className="contact-container">
          <div className={`contact-info-card ${isVisible ? 'animate' : ''}`}>
            <div className="contact-image">
              <img src={contact} alt="Contact" />
            </div>
            
            <div className="contact-info">
              <h3>Let's Talk</h3>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="info-content">
                  <h4>Email</h4>
                  <p>bablukumar09001@gmail.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="info-content">
                  <h4>Phone</h4>
                  <p>+91 8920549001</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="info-content">
                  <h4>Location</h4>
                  <p>Noida,UP,India</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <h4>Connect With Me</h4>
              <div className="social-icons">
                <a href="https://www.instagram.com/abhay__9001/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com/abhay559722/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/babluku9001" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com/in/bablu-kumar-a0aa16231/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/bablukumar9001" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className={`contact-form-card ${isVisible ? 'animate' : ''}`}>
            <h3>Send Me a Message</h3>
            <form onSubmit={PostData}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="fas fa-user"></i> Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Enter your name"
                    className={formErrors.name ? "error" : ""}
                  />
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i> Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Enter your email"
                    className={formErrors.email ? "error" : ""}
                  />
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="mobile">
                    <i className="fas fa-phone"></i> Phone Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={user.mobile}
                    onChange={handleInputs}
                    placeholder="Enter your phone number"
                    className={formErrors.mobile ? "error" : ""}
                  />
                  {formErrors.mobile && <span className="error-message">{formErrors.mobile}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">
                    <i className="fas fa-tag"></i> Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={user.subject}
                    onChange={handleInputs}
                    placeholder="Enter subject"
                    className={formErrors.subject ? "error" : ""}
                  />
                  {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">
                  <i className="fas fa-comment"></i> Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={user.message}
                  onChange={handleInputs}
                  placeholder="Enter your message"
                  className={formErrors.message ? "error" : ""}
                ></textarea>
                {formErrors.message && <span className="error-message">{formErrors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;
