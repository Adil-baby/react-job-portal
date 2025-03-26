import cloudinary from "cloudinary";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }

  const { name, email, coverLetter, phone, address, jobId } = req.body;
  
  if (!jobId) {
    return next(new ErrorHandler("Job ID is required!", 400));
  }

  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    jobId,
    applicantID: {
      user: req.user._id,
      role: "Job Seeker",
    },
    employerID: {
      user: job.postedBy,
      role: "Employer",
    },
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  // Update job applications counter
  await Job.findByIdAndUpdate(jobId, {
    $inc: { applications: 1 }
  });

  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  
  // Debug log
  console.log("User role:", role);
  
  if (role !== "Employer") {
    return next(
      new ErrorHandler("Only Employers can access this resource.", 400)
    );
  }
  
  const { _id } = req.user;
  const applications = await Application.find({ "employerID.user": _id })
    .populate({
      path: 'jobId',
      select: 'title'
    });
    
  res.status(200).json({
    success: true,
    applications,
  });
});

export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  
  // Debug log
  console.log("User role:", role);
  
  if (role !== "Job Seeker") {
    return next(
      new ErrorHandler("Only Job Seekers can access this resource.", 400)
    );
  }
  
  const { _id } = req.user;
  const applications = await Application.find({ "applicantID.user": _id })
    .populate({
      path: 'jobId',
      select: 'title'
    });
    
  res.status(200).json({
    success: true,
    applications,
  });
});

export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);
