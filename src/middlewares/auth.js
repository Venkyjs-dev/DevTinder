const adminToken = "123";
const adminAuth = (req, res, next) => {
  const reqAuthToken = req.query.token;
  console.log("admin auth checked....");
  if (reqAuthToken != adminToken) {
    res.status(401).send("Unathorized request!!!");
  } else {
    console.log("admin auth success!!!");
    next();
  }
};

const userAuth = (req, res, next) => {
  const reqAuthToken = req.query.token;
  console.log("user auth checked....");
  if (reqAuthToken != adminToken) {
    res.status(401).send("Unathorized request!!!");
  } else {
    console.log("user auth  success!!!");
    next();
  }
};
module.exports = {
  adminAuth,
  userAuth,
};
