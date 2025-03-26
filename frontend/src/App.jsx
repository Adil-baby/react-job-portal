import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import JobDetails from "./components/Job/JobDetails";
import Jobs from "./components/Job/Jobs";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJob";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import NotFound from "./components/NotFound/NotFound";
import { Context } from "./main";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        console.log("User data:", response.data);
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.error("Auth error:", error);
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />

          {/* Job Seeker Routes */}
          {user && user.role === "Job Seeker" ? (
            <>
              <Route path="/application/:id" element={<Application />} />
              <Route path="/applications/me" element={<MyApplications />} />
            </>
          ) : null}

          {/* Employer Routes */}
          {user && user.role === "Employer" ? (
            <>
              <Route path="/job/post" element={<PostJob />} />
              <Route path="/job/me" element={<MyJobs />} />
              <Route path="/applications/me" element={<MyApplications />} />
            </>
          ) : null}

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
