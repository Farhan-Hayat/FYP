const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["player", "groundOwner" , "admin"],
      required: true,
    },
    team: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.signup = async function (body) {
  const { name, username, password, phoneNumber, role, team } = body;

  if (!name || !username || !password || !phoneNumber || !role) {
    throw new Error("Please fill all the fields");
  }

  const userExist = await this.findOne({ username });
  if (userExist) {
    throw new Error("User already exists with this username");
  }

  if (role === "player" && !team) {
    throw new Error("Please Enter Team Name");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new this({
    name,
    username,
    password: hashedPassword,
    phoneNumber,
    role,
    team,
  });
  return await newUser.save();
};

userSchema.statics.login = async function (body) {
  const { username, password } = body;
  if (!username || !password) {
    throw new Error("Please fill all the fields");
  }
  const user = await this.findOne({ username });
  if (!user) {
    throw new Error("Invalid Username or Password");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid Username or Password");
  }

  const newUser = {
    _id: user._id,
    name: user.name,
    username: user.username,
    phoneNumber: user.phoneNumber,
    role: user.role,
    team: user.team,
    profilePicture:user.profilePicture
  };

  return newUser;
};


userSchema.statics.getUser = async function (id) {
  const user = await this.findOne({ _id: id }).select("-password");

  return user;
};

userSchema.statics.uploadProfilePicture = async function (id, imageCode) {
  let user = await this.findByIdAndUpdate({_id:id}, {
    profilePicture: imageCode,
  }).select("-password");
  return user;
};

userSchema.statics.changePassword = async function (id, body) {
  const { password, newPassword } = body;
  let user = await this.findOne({ _id: id });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw Error("Invalid Current Password");
  }
  const salt = await bcrypt.genSalt(10);
  const hashNewPassword = await bcrypt.hash(newPassword, salt);
  user = await this.findByIdAndUpdate(
    {_id:id},
    { password: hashNewPassword },
    { new: true }
  ).select("-password")
  return user;
};

userSchema.statics.updateProfile = async function(id,body){
  console.log('body', body)
  const user = await this.findOneAndUpdate({_id:id},body , {new:true}).select("-password")
  return user
}

const User = mongoose.model("User", userSchema);
module.exports = User;
