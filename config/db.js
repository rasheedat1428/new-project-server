import mongoose from "mongoose";

const dbConfig = () =>
mongoose
.connect(process.env.MONGODB_URL)
.then((con) => 
    console.log(`Connected to MongoDb cluster via ${con.connection.host}`))

    .catch((err) => 
      console.error(`Unable to connect to mongoDb cluster ${err.message}`));

export default dbConfig;