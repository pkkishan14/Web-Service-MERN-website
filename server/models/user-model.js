const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Query middleaware

// PRE Middleware for hashing
userSchema.pre("save", async function (next) {
  // console.log("pre wala", this); // this me user.body aa rha hai
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

// json web token Generation step
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY, //payload and signature (yahan pe jo bhi payload pass hoga wo token verify hone par recieve hoga)
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.error(error);
  }
};

// compare user password with the password in database
userSchema.methods.comparePassword = async function (password) {
  try {
    return  bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(error);
  }
};

// define the model or the collection name
// syntax:  mongoose.model(collectionName, schema structure)

const User = new mongoose.model("User", userSchema);

module.exports = User;
