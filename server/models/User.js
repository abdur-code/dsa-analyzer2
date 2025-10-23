// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 254
  },
  password: {
    type: String,
    required: true
  },
  // optional: add role, preferences, avatarUrl, etc.
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  submissions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Submission" }
  ]
});

// Instance method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive fields when converting to JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Optional helper for frontend (small profile payload)
userSchema.methods.profile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role
  };
};

const User = mongoose.model("User", userSchema);
export default User;
