const mongoose = require("mongoose");
const ConnectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log("mongodb connectd:", conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = ConnectToDb;
