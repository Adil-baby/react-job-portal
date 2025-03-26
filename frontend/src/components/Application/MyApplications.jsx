import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
      return;
    }

    const fetchApplications = async () => {
      try {
        const endpoint = user?.role === "Employer" 
          ? "/application/employer/getall"
          : "/application/jobseeker/getall";

        const { data } = await axios.get(`http://localhost:4000/api/v1${endpoint}`, {
          withCredentials: true
        });
        
        setApplications(data.applications);
      } catch (error) {
        console.error("Application fetch error:", error);
        toast.error(error.response?.data?.message || "Error fetching applications");
      }
    };

    fetchApplications();
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <section className="my_applications page">
      <div className="container">
        <h1>
          {user?.role === "Employer" 
            ? "Applications From Job Seekers"
            : "My Applications"}
        </h1>
        
        <div className="applications-list">
          {applications.length === 0 ? (
            <p>No applications found</p>
          ) : (
            applications.map((element) => (
              user?.role === "Employer" ? (
                <EmployerCard 
                  key={element._id}
                  element={element}
                  openModal={openModal}
                />
              ) : (
                <JobSeekerCard
                  key={element._id}
                  element={element}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              )
            ))
          )}
        </div>
      </div>
      
      {modalOpen && (
        <ResumeModal 
          imageUrl={resumeImageUrl} 
          onClose={() => setModalOpen(false)} 
        />
      )}
    </section>
  );
};

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Job Title:</span> {element.jobId && element.jobId.title}
          </p>
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>Cover Letter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Job Title:</span> {element.jobId && element.jobId.title}
          </p>
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>Cover Letter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};

export default MyApplications;