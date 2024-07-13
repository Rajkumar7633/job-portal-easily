import UserModel from "../models/user.model.js";
export default class UserController {
  getLogin = (req, res, next) => {
    res.render("user-login", { errors: null });
  };
  addUser = (req, res) => {
    UserModel.addUser(req.body);
    res.redirect("/login");
  };
  loginUser = (req, res) => {
    const { email, password } = req.body;
    const userToAuthenticate = UserModel.confirmLogin(req.body);
    if (!userToAuthenticate) {
      res.render("404", {
        msg: "user not found pls register",
      });
    }
    if (
      userToAuthenticate.email === email &&
      userToAuthenticate.password === password
    ) {
      req.session.user = userToAuthenticate;
      res.redirect("/jobs");
    } else {
      res.render("404", { msg: "invalid credentials" });
    }
  };
  logoutUser = (req, res) => {
    req.session.userEmail = null;
    res.clearCookie("lastVisit");
    req.session.destroy((err) => {
      if (err) console.log(err);
      else res.redirect("/login");
    });
  };
}
