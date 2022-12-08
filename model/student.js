import mongoose, {Schema} from "mongoose";

const StudentSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unigue: true,
    },
  });
  
  const StudentModel = mongoose.model("student", StudentSchema);
  export default StudentModel;