// import { catchAsyncError } from "../middlewares/catchAsyncError.js";
// import ErrorHandler from "../middlewares/error.js";
// import { Job } from "../models/jobSchema.js";

// export const getAllJobs = catchAsyncError(async (req, res, next) => {
//     const job = await Job.find({ expired: false });
//     res.status(200).json({
//         success: true,
//         job,
//     });
// });


// export const postJob = catchAsyncError(async (req, res, next) => {
//     const { role } = req.user;                                            //req.user is being set from the auth.js file.We forward the incoming request to the auth.js file first ref jobRouter.js file
//     if (role === "Job seeker") {
//         return next(new ErrorHandler("Job seeker is not allowed to access this resourses!", 400));
//     }
//     const {
//         title,
//         description,
//         category,
//         country,
//         city,
//         location,
//         fixedSalary,
//         salaryFrom,
//         salaryTo,
//     } = req.body;

//     if (!title || !description || !category || !country || !city || !location) {
//         return next(new ErrorHandler("Please provide full job details.", 400));
//     }

//     if ((!salaryFrom || !salaryTo) && !fixedSalary) {
//         return next(
//             new ErrorHandler(
//                 "Please either provide fixed salary or ranged salary.",
//                 400
//             )
//         );
//     }

//     if (salaryFrom && salaryTo && fixedSalary) {
//         return next(
//             new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
//         );
//     }

//     const postedBy = req.user._id;
//     const job = await Job.create({
//         title,
//         description,
//         category,
//         country,
//         city,
//         location,
//         fixedSalary,
//         salaryFrom,
//         salaryTo,
//         postedBy,
//     });

//     res.status(200).json({
//         success: true,
//         message: "Job Posted Successfully!",
//         job,
//     });
// });


// export const getMyJobs = catchAsyncError(async (req, res, next) => {
//     const { role } = req.user;
//     if (role === "Job seeker") {
//       return next(
//         new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
//       );
//     }
//     const myJobs = await Job.find({ postedBy: req.user._id });
//     res.status(200).json({
//       success: true,
//       myJobs,
//     });
//   });



// export const updateJob = catchAsyncError(async (req, res, next) => {
//     const { role } = req.user;
//     if (role === "Job Seeker") {
//       return next(
//         new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
//       );
//     }
//     const { id } = req.params;                                           // This parameter can be sent along with the route
//     let job = await Job.findById(id);
//     if (!job) {
//       return next(new ErrorHandler("OOPS! Job not found.", 404));
//     }
//     job = await Job.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     });
//     res.status(200).json({
//       success: true,
//       message: "Job Updated!",
//       job,
//     });
//   });



// export const deleteJob = catchAsyncError(async(req,res,next)=>{
//     const { role } = req.user;
//     if (role === "Job Seeker") {
//       return next(
//         new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
//       );
//     }
//     const { id } = req.params;                                           // This parameter can be sent along with the route
//     let job = await Job.findById(id);
//     if (!job) {
//       return next(new ErrorHandler("OOPS! Job not found.", 404));
//     }
//     await job.deleteOne();
//     res.status(200).json({
//         success : true,
//         message : "Job Deleted Successfully"
//     })
    
// })



//new 
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler(
        "Please either provide fixed salary or ranged salary.",
        400
      )
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
    );
  }
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job Updated!",
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});