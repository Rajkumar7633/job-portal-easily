import express from "express";
import JobControl from "../controllers/job.controller.js";
const jobController = new JobControl();
import uploadFile from "../middlewares/fileUploadMiddleware.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// get routes
router.route("/404").get((req, res) => {
  res.render("404", { msg: "Hi" });
});
router.route("/").get(jobController.renderLandingPage);
router.route("/jobs").get(jobController.getJobs);
router.route("/job/:id").get(jobController.findJobById);
router.route("/postjob").get(auth, jobController.renderJobForm);
router.route("/job/applicants/:id").get(auth, jobController.allApplicants);
router.route("/job/update/:id").get(auth, jobController.renderUpdateform);

// post routes
router.route("/job").post(jobController.newjob);
router
  .route("/apply/:id")
  .post(uploadFile.single("resume"), jobController.newApplicant);
router.route("/job/update/:id").post(auth, jobController.updateJobById);

// delete route
router.route("/job/delete/:id").get(auth, jobController.deleteJob);

export default router;
