import React from 'react'
import "./css/skills.css"

const Skills = () => {
  return (
    <>
      <section className="skills" id='skills11'>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-12 mt-5 " >
              <div className="section-title text-center">
                <span className="subtitle">
                  {" "}
                  Here all my skills and work portfolio
                </span>
                <h2>Skills</h2>

                <p>
                  These all my latest services are being provided by me. I am
                  good at all these skills. I always try my level best to give
                  my best to the clients .


                </p>



              </div>
            </div>{" "}
          </div>

        </div>

      </section>
      <section id="skills" className="section scrollspy">
        <div className="container">

          {/* Languages and Databases */}
          <div className="card">
            <div className="card-content">
              <h4 className="brown-text light">Languages and Databases</h4>
              <div className="row text-center ">
                <div className="col s4 m2 skill-hover">
                  <img alt="" src="/images/javascript.png" className="responsive-img" />Javascript
                </div>
                <div className="col s4 m2 skill-hover">
                  <img alt="" src="/images/html5-300x300.jpg" className="responsive-img" />HTML5
                </div>
                <div className="col s4 m2 skill-hover">
                  <img alt="" src="/images/css3-300x300.jpg" className="responsive-img" />CSS3
                </div>
                <div className="col s4 m2 skill-hover">
                  <img alt="" src="/images/mysql-logo-1-300x300.jpg" className="responsive-img" />MySQL
                </div>
                <div className="col s4 m2 skill-hover">
                  <img alt="" src="/images/mongodb.png" className="responsive-img" />PostgreSQL
                </div>
                <div className="col s4 m2 skill-hover">
                  <img alt="" src="/images/php.png" className="responsive-img" />Shell Scripting
                </div>
              </div>
            </div>
          </div>

          {/* Libraries */}
          <div className="card">
            <div className="card-content">
              <h4 className="brown-text light">Libraries and Frameworks</h4>
              <div className="row text-center">
                <div className="col s4 m2 skill-hover">
                  <img alt="" src=" /images/react.png" className="responsive-img" />React Js
                </div>
                <div className="col s4 m2 skill-hover">
                  <img alt="" src=" /images/express.png" className="responsive-img" />Express
                </div>
                <div className="col s4 m2 skill-hover">
                  <img alt="" src="/images/node.png" className="responsive-img" />Node Js
                </div>
                <div className="col s4 m2 skill-hover">
                  <img alt="" src="/images/laravel.png" className="responsive-img" />Laravel
                </div>
                <div className="col s4 m2 skill-hover">
                  <img alt="" src="/images/bootstrap.png" className="responsive-img" />Bootstrap
                </div>
                <div className="col s4 m2 skill-hover">
                  <img alt="" src="/images/tailwind.png" className="responsive-img" />Tailwind
                </div>
              </div>
            </div>
          </div>

     

          {/* Other Skills */}
          <div className="card">
            <div className="card-content ">
              <h4 className="brown-text light">Other</h4>
              <div className="row text-center">
                <div className="col s4 m2 skill-hover">
                  <img alt="" src=" /images/git.png" className="responsive-img" />Git
                </div>
                <div className="col s4 m2 skill-hover">
                  <img alt="" src=" /images/postman.png" className="responsive-img" />Postman
                </div>
                <div className="col s4 m2 skill-hover">
                  <img alt="" src=" /images/api.png" className="responsive-img" />API's
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </section>
    </>
  )
}

export default Skills