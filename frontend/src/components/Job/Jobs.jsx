import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const filteredJobs = jobs.jobs?.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        
        <div className="search-wrapper">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search jobs by title, category or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="banner">
          {filteredJobs &&
            filteredJobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <div>
                    <h3>{element.title}</h3>
                    <p className="category">{element.category}</p>
                    <p className="location">
                      <strong>Location:</strong> {element.country}, {element.city}
                    </p>
                    <div className="job-info">
                      <p>Vacancies: {element.vacancies || 1}</p>
                      <p>Applications: {element.applications || 0}</p>
                    </div>
                    <p className="posted-date">
                      Posted: {new Date(element.jobPostedOn).toLocaleDateString()}
                    </p>
                  </div>
                  <Link to={`/job/${element._id}`}>View Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;