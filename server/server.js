const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const groundRoutes = require("./routes/groundRoutes")
const signupRequestRoutes = require("./routes/signupRequestRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const leagueRoutes = require("./routes/leagueRoutes")
const teamRoutes = require("./routes/teamRoutes")
// const myParser = require("body-parser");
require("dotenv").config();
const app = express();

app.use(express.json({limit:"25mb"}));
app.use(cors());
app.use(express.urlencoded({limit: '25mb'}));

mongoose.connect("mongodb://localhost:27017/FYP").then(() => {
  app.listen(process.env.PORT, () => {
    console.log("connected to port 3001 & Database FYP");
  });
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/ground" , groundRoutes)
app.use("/api/signupRequest" ,signupRequestRoutes )
app.use("/api/booking" , bookingRoutes)
app.use("/api/league" , leagueRoutes)
app.use("/api/team" , teamRoutes)
