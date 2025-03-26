// import mongoose from "mongoose";
// import validator from "validator";

// const applicationSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter your Name!"],
//     minLength: [3, "Name must contain at least 3 Characters!"],
//     maxLength: [30, "Name cannot exceed 30 Characters!"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please enter your Email!"],
//     validate: [validator.isEmail, "Please provide a valid Email!"],
//   },
//   coverLetter: {
//     type: String,
//     required: [true, "Please provide a cover letter!"],
//   },
//   phone: {
//     type: Number,
//     required: [true, "Please enter your Phone Number!"],
//   },
//   address: {
//     type: String,
//     required: [true, "Please enter your Address!"],
//   },
//   resume: {
//     public_id: {
//       type: String, 
//       required: true,
//     },
//     url: {
//       type: String, 
//       required: true,
//     },
//   },
//   applicantID: {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["Job Seeker"],
//       required: true,
//     },
//   },
//   employerID: {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["Employer"],
//       required: true,
//     },
//   },
//   jobId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Job",
//     required: true
//   }
// });

// export const Application = mongoose.model("Application", applicationSchema);

// export const employerGetAllApplications = catchAsyncErrors(
//   async (req, res, next) => {
//     const { role } = req.user;
//     if (role === "Job Seeker") {
//       return next(
//         new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
//       );
//     }
//     const { _id } = req.user;
//     const applications = await Application.find({ "employerID.user": _id })
//       .populate('jobId', 'title'); // Add this line to get job details
//     res.status(200).json({
//       success: true,
//       applications,
//     });
//   }
// );

// export const jobseekerGetAllApplications = catchAsyncErrors(
//   async (req, res, next) => {
//     const { role } = req.user;
//     if (role === "Employer") {
//       return next(
//         new ErrorHandler("Employer not allowed to access this resource.", 400)
//       );
//     }
//     const { _id } = req.user;
//     const applications = await Application.find({ "applicantID.user": _id })
//       .populate('jobId', 'title'); // Add this line to get job details
//     res.status(200).json({
//       success: true,
//       applications,
//     });
//   }
// );

// const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
//   return (
//     <>
//       <div className="job_seeker_card">
//         <div className="detail">
//           <p>
//             <span>Job Title:</span> {element.jobId?.title || "N/A"}
//           </p>
//           <p>
//             <span>Name:</span> {element.name}
//           </p>
//           <p>
//             <span>Email:</span> {element.email}
//           </p>
//           <p>
//             <span>Phone:</span> {element.phone}
//           </p>
//           <p>
//             <span>Address:</span> {element.address}
//           </p>
//           <p>
//             <span>Cover Letter:</span> {element.coverLetter}
//           </p>
//         </div>
//         <div className="resume">
//           <img
//             src={element.resume.url}
//             alt="resume"
//             onClick={() => openModal(element.resume.url)}
//           />
//         </div>
//         <div className="btn_area">
//           <button onClick={() => deleteApplication(element._id)}>
//             Delete Application
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// const EmployerCard = ({ element, openModal }) => {
//   return (
//     <>
//       <div className="job_seeker_card">
//         <div className="detail">
//           <p>
//             <span>Job Title:</span> {element.jobId?.title || "N/A"}
//           </p>
//           <p>
//             <span>Name:</span> {element.name}
//           </p>
//           <p>
//             <span>Email:</span> {element.email}
//           </p>
//           <p>
//             <span>Phone:</span> {element.phone}
//           </p>
//           <p>
//             <span>Address:</span> {element.address}
//           </p>
//           <p>
//             <span>Cover Letter:</span> {element.coverLetter}
//           </p>
//         </div>
//         <div className="resume">
//           <img
//             src={element.resume.url}
//             alt="resume"
//             onClick={() => openModal(element.resume.url)}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please provide a cover letter!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  address: {
    type: String,
    required: [true, "Please enter your Address!"],
  },
  resume: {
    public_id: {
      type: String, 
      required: true,
    },
    url: {
      type: String, 
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  }
});

export const Application = mongoose.model("Application", applicationSchema);