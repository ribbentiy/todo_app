const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");

const app = express();

//middleware

app.use(bodyParser.json());
app.use(cors());

const tasks = require("./server/routes/api/tasks");
app.use("/api/tasks", tasks);

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
