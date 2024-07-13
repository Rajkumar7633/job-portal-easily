import { sendConfirmationMail } from "../middlewares/sendMail.js";
import {
  addNewApplicant,
  createNewJob,
  deleteJob,
  findJobById,
  getAllJobs,
  sendAllApplicants,
  updateJob,
} from "../models/job.model.js";

export default class JobControl {
  renderLandingPage = (req, res) => {
    res.render("landing-page", { user: req.session.user });
  };
  getJobs = (req, res) => {
    let jobs = getAllJobs();
    res.render("list-all-jobs", { jobs, user: req.session.user });
    // res.render("product", { products, userEmail: req.session.userEmail });
  };
  newjob = (req, res) => {
    createNewJob(req.body);
    res.redirect("/jobs");
  };
  renderJobForm = (req, res) => {
    res.render("new-job", { user: req.session.user });
  };
  findJobById = (req, res) => {
    const id = req.params.id;
    const jobaData = findJobById(id);
    res.render("job-details", { data: jobaData, user: req.session.user });
  };
  newApplicant = async (req, res) => {
    const id = req.params.id;
    const { name, email, contact } = req.body;
    const resumePath = req.file.filename;
    addNewApplicant(id, name, email, contact, resumePath);
    await sendConfirmationMail(email);
    res.redirect("/jobs");
  };
  allApplicants = (req, res) => {
    const id = req.params.id;
    const resp = sendAllApplicants(id);
    res.render("all-applicants", {
      allApplicants: resp,
      user: req.session.user,
    });
  };
  renderUpdateform = (req, res) => {
    const id = req.params.id;
    const resp = findJobById(id);
    res.render("update-job", { job: resp });
  };
  updateJobById = (req, res) => {
    const id = req.params.id;
    updateJob(id, req.body);
    res.redirect(`/job/${id}`);
  };
  deleteJob = (req, res) => {
    const id = req.params.id;
    deleteJob(id);
    res.redirect("/jobs");
  };
}
