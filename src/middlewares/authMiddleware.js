export const auth = (req, res, next) => {
  if (req.session.user) next();
  else {
    res.render("404", {
      msg: "only recruiter is allowed to access this page, login as recruiter to continue",
    });
  }
};
