import React from "react";
import "./css/footer.css";
import mylogo from "/images/mylogo1.png";

const footer = () => {
  return (
    <>
      <div className="rn-footer-area rn-section-gap section-separator">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-area text-center">
                <div className="logo">
                  <a>
                    <img src={mylogo} style={{ height: "80px" }} alt="logo" />
                  </a>
                </div>
                <p className="description mt--30">
                  Copyright © 2023. All rights reserved by--
                  <a target="" href="#home11">
                    Bablu kumar.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default footer;
