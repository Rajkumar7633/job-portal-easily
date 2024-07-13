export const lastVisit = (req, res, next) => {
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  } else {
    res.cookie("lastVisit", new Date().toISOString(), {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
  }
  next();
};
