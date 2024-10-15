const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://venkatesh131755:yGiIuGKu7odxPDk5@mynodecluster.r553g.mongodb.net/"
  );
};

module.exports = connectDB;
