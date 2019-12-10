const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const ejwt = require("express-jwt");
const tasks = require("./server/routes/api/tasks");
const users = require("./server/routes/api/users");
const desks = require("./server/routes/api/desks");

const app = express();

//middleware

app.use(
  ejwt({
    secret: config.JWT_SECRET
  }).unless({
    path: ["/api/user/auth", "/api/user/register"]
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", users);
app.use("/api/tasks", tasks);
app.use("/api/desks", desks);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res
      .status(401)
      .send({ message: "No token was found or token date is expired" });
  }
});

const port = config.PORT;
app.listen(port, async () => {
  mongoose.set("useFindAndModify", false);
  await mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(`Server is started on port ${port}`);
});

const db = mongoose.connection;
db.on("error", err => console.log(err));
