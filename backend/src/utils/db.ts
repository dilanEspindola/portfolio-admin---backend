import { connect } from "mongoose";
import config from "../config";

const dbConnection = () => {
  connect(config.MONGO_DB_URI || "")
    .then((conn) =>
      console.log("Connected to:", conn.connection.db.databaseName)
    )
    .catch((error) => {
      throw new Error(error as string);
    });
};

export default dbConnection;
