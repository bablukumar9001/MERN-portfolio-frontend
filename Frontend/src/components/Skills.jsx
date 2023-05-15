import React from "react";
import "./css/skill.css";

const Skills = () => {
  return (
    <>
      <div className="col-lg-12 mt-5 " id="skills">
        <div className="section-title text-center">
          <span className="subtitle">
            here all my education,skills and experience
          </span>
          <h2>Resume</h2>
        </div>
      </div>

      <div className="container text-center">
        <div className="row justify-content-md-center">
          <div className="col-md-10">
            <div className="pt-4">
              <ul
                className="nav nav-pills justify-content-ceneter justify-content-lg-between mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link test"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-skill"
                    type="button"
                    role="tab"
                    aria-controls="pills-skill"
                    aria-selected="true"
                  >
                    Web skills
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link test"
                    id="pills-education-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-education"
                    type="button"
                    role="tab"
                    aria-controls="pills-education"
                    aria-selected="false"
                  >
                    Education
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active test"
                    id="pills-awards-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-awards"
                    type="button"
                    role="tab"
                    aria-controls="pills-awards"
                    aria-selected="true"
                  >
                    Strength
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link test"
                    id="pills-experience-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-experience"
                    type="button"
                    role="tab"
                    aria-controls="pills-experience"
                    aria-selected="false"
                  >
                    Experience
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade"
                  id="pills-skill"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  tabIndex="0"
                >
                  <div className="ex2 img-fluid">
                    <div className="single-progress">
                      <h6>C</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "90%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">80%</span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>Python</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "90%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">90%</span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>HTML AND CSS</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "85%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">85%</span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>javascript</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "70%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">70%</span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>Node JS</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">90%</span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>Express JS</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "70%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">70%</span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>React JS</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "80%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">80%</span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>DJANGO </h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar "
                            role="progressbar"
                            style={{ width: "60%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">
                          60% <span className=" progresss"></span>
                        </span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>MongoDB & Mongoose database</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "75%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">75%</span>
                      </div>
                    </div>
                    <div className="single-progress">
                      <h6>REST api's</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "75%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">75%</span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>bootsrap css framework</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "90%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">90%</span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>jQuery</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "70%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">70%</span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>data structures and algorithm with c</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "75%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">75%</span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>GIT AND GITHUB</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "85%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">85%</span>
                      </div>
                    </div>

                    <div className="single-progress">
                      <h6>Fluent english speaking</h6>
                      <div className="designing">
                        <div className="progress meter">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "85%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span className="progresss"></span>
                          </div>
                        </div>
                        <span className="label">85%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade container-fluid active show"
                  id="pills-awards"
                  role="tabpanel"
                  aria-labelledby="pills-awards-tab"
                  tabIndex="0"
                >
                  <ul className="text-start ps-0" type="circle">
                    <li>
                      <a href="#"> Self Motivated</a>
                    </li>
                    <a href="#"></a>
                    <li>
                      <a href="#"></a>
                      <a href="#"> Quick Learner</a>
                    </li>
                    <a href="#"></a>
                    <li>
                      <a href="#"></a>
                      <a href="#"> HardWorking</a>
                    </li>
                    <a href="#"></a>
                    <li>
                      <a href="#"></a>
                      <a href="#"> Discplined Person</a>
                    </li>
                    <a href="#"></a>
                    <li>
                      <a href="#"></a>
                      <a href="#"> Good comunication skills</a>
                    </li>
                    <a href="#"></a>
                  </ul>
                  <a href="#"></a>
                </div>
                <a href="#"></a>
                <div
                  className="tab-pane fade"
                  id="pills-experience"
                  role="tabpanel"
                  aria-labelledby="pills-experience-tab"
                  tabIndex="0"
                >
                  <a href="#"></a>
                  <div className="container-fluid">
                    <a href="#"></a>
                    <ul className="text-start ps-0 ">
                      <a href="#">
                        <p className="strength-font">
                          As a fresher I am Seeking a challenging position in a
                          reputed organization where I can learn new skills,
                          expand my knowledge, and leverage my learnings As well
                          as Create value for my prospective employer through my
                          dedicated and diligent efforts.
                        </p>
                      </a>
                      <li>
                        <a href="#"></a>
                        <a href="#"></a>
                      </li>
                      <a href="#"></a>
                    </ul>
                    <a href="#"></a>
                  </div>
                  <a href="#"></a>
                </div>
                <a href="#"></a>
                <div
                  className="tab-pane fade container-fluid"
                  id="pills-education"
                  role="tabpanel"
                  aria-labelledby="pills-education-tab"
                  tabIndex="0"
                >
                  <a href="#"></a>
                  <ul className="text-start ps-0">
                    <a href="#"></a>
                    <li>
                      <a href="#"></a>
                      <a href="#">
                        {" "}
                        class 10th
                        <span>- Bal jyoti public school, CBSE Board</span>
                      </a>
                      2013-2015
                    </li>

                    <li>
                      <a href="#">
                        {" "}
                        class 12th
                        <span>- S.B.N public school, CBSE Board</span>
                      </a>
                      2016-2018
                    </li>

                    <li>
                      <a href="#">
                        {" "}
                        Graduated at BCA
                        <span>
                          - Hi-tech institue of Enger. and technology, CCS
                          University
                        </span>
                      </a>
                      2018-2021
                    </li>

                    <li>
                      <a href="#">
                        {" "}
                        Now Pursing MCA
                        <span>
                          - Hi-tech institue of Enger. and technology,AKTU
                          University
                        </span>
                      </a>
                      2021-2023
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;
