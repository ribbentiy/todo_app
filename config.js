module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || "http://localhost:3000",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb://test123:test123@ds037611.mlab.com:37611/ribb_todo_app"
  JWT_SECRET: process.env.JWT_SECRET || "secret"
};
