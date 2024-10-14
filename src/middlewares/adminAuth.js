const adminToken = "123";
const adminAuth = (req, res, next) => {
  const reqAuthToken = req.query.token;
  console.log("admin auth checked....");
  console.log(reqAuthToken, "reqAutToken-->");
  if (reqAuthToken != adminToken) {
    res.status(401).send("Unathorized request!!!");
  } else {
    console.log("authencation success!!!");
    next();
  }
};

module.exports = {
  adminAuth,
};
