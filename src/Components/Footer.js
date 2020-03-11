import React from "react";

const Footer = () => {
  return (
    <div className="container" id="footer">
      <div className="card">
        <div className="card-header">Technologies</div>
        <div className="card-body">
          <h5 className="card-title"> Project Description: </h5>
          <p className="card-text">
            <u>Histogram-1</u>: This Histogram shows the total sessions based on
            the devices.
          </p>
          <p className="card-text">
            <u>Graph</u>: The Graph is to showcase the progression of the data
            usage of the devices.
          </p>
          <p className="card-text">
            <u>Histogram-2</u>: This Histogram show the total data usage in KB
            based on the devices.
          </p>
          <hr />
          <h5 className="card-title"> Technologies used in this project: </h5>
          <p className="card-text"> React Framework (React Hooks)</p>

          <p className="card-text">
            {" "}
            Front End: HTML 5, CSS 3, JavaScript, Bootstrap{" "}
          </p>
          <a
            href="https://github.com/innodjet/my-lab-6"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            id="repoButton"
          >
            {" "}
            Github Reposotory{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
