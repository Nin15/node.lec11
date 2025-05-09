const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
    select: false, //! never take the pass
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "post",
    default: [],
  }
});

module.exports = mongoose.model("user", userSchema);
