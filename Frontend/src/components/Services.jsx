import React from "react";
import "./css/services.css";

const Services = () => {
  return (
    <>
      <section id="services" className="services-wrapper service11">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mt-5 " id="about11">
              <div className="section-title text-center">
                <span className="subtitle">
                  {" "}
                  Here all my services and work portfolio{" "}
                </span>
                <h2>Services</h2>

                <p>
                  These all my latest services are being provided by me. I am
                  good at all these skills. I always try my level best to give
                  my best to the clients .
                </p>
              </div>
            </div>{" "}
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card">
                <div className="card-body text-md-start text-cenetr ">
                  {/* <i className="fab fa-twitter fa-bounce icon-color text-center"></i> */}
                  <i
                    className="fab fa-react fa-beat-fade fa-regular icon-color"
                    style={{ color: "#1d5ecd" }}
                  ></i>

                  <h4>Frontend Developer </h4>
                  <p className="card-text">
                    Front end developers build the parts of websites and apps
                    you interact with everyday.As a Frontend Developer i have
                    good knowledged about frontend skills such as HTML, CSS,
                    javascript,bootstrap, React js, Hooks and Redux toolkit .
                    Frontend developer with React JS which is free and
                    open-source front-end JavaScript library for building user
                    interfaces based on components.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card">
                <div className="card-body text-md-start text-cenetr ">
                  <i
                    className="fab fa-node fa-beat-fade fa-regular icon-color"
                    style={{ color: "#207c0e" }}
                  ></i>
                  <h4>Backend Developer</h4>
                  <p className="card-text">
                    As a Backend developer i have knowledged about MERN stack (
                    Node js, Express js, React js, Mongodb ) and Django (python
                    backend framework) . Backend developer responsibilities
                    include creating, maintaining, testing, and debugging the
                    entire back end of an application or system. This includes
                    the core application logic, databases, data and application
                    integration, API, and other processes taking place behind
                    the scenes.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card">
                <div className="card-body text-md-start text-cenetr ">
                  <i
                    className="fab fa-python fa-beat-fade fa-regular icon-color"
                    style={{ color: "#d95b17" }}
                  ></i>
                  <h4>Python Developer</h4>
                  <p className="card-text">
                    As a Python developer, I can do everything from web or game
                    development to quantitative analysis and website backend
                    develpopment using Django . Python is a programming language
                    used for a variety of programming tasks, including
                    artificial intelligence (AI), machine learning, data
                    analytics, and data visualization.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card">
                <div className="card-body text-md-start text-cenetr ">
                  <i
                    className="fas fa-laptop fa-beat-fade fa-regular icon-color"
                    style={{ color: "#023388" }}
                  ></i>
                  <h4>Full stack developer</h4>
                  <p className="card-text">
                    A full stack developer is a web developer or engineer who
                    works with both the front and back ends of a website or
                    application. In this sense, they provide an end-to-end
                    service, and can be involved in projects that involve
                    databases and building user-facing websites.The Full-Stack
                    Developer designs and maintains websites and systems to
                    serve a company's needs.They manage the client and
                    server-side of these services.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card">
                <div className="card-body text-md-start text-cenetr ">
                  <i
                    className="fas fa-database fa-beat-fade fa-regular icon-color"
                    style={{ color: "#ede60c" }}
                  ></i>
                  <h4>Data Struct. & algorithm</h4>
                  <p className="card-text">
                    I have good knowledge about data structures and algorithms.
                    In addition i studied data structures and algorithm with c
                    language. A data structure is a method of organizing data in
                    a virtual system. Think of sequences of numbers, or tables
                    of data: these are both well-defined data structures. An
                    algorithm is a sequence of steps executed by a computer that
                    takes an input and transforms it into a target output
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card">
                <div className="card-body text-md-start text-cenetr ">
                  <i
                    className="fab fa-windows fa-beat-fade fa-regular icon-color"
                    style={{ color: "#03b1fc" }}
                  ></i>
                  <h4>Computer's basics</h4>
                  <p className="card-text">
                    I have good knowledged about all the compuetrs basics skils
                    such as MS-word, MS-excel, MS-powerpoint, photoshop and many
                    more.To provide data entry support to superiors. To prepare
                    communication, reports, presentations and other products by
                    operating Microsoft Word, Excel, and Powerpoint.MS office
                    allows you to create, save, and edit files on different
                    devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
