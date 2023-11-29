const bcryp = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const saltRounds = 10;

UserSchema.pre("save", function (next) {  
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcryp
      .hash(document.password, saltRounds)
      .then((hashedPassword) => {
        document.password = hashedPassword;
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
});

UserSchema.methods.isCorrectPassword = function (candidatePassword, callback) {
  bcryp.compare(candidatePassword, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
