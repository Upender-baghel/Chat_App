const express = require("express");
const app = express();
const port = 8000;
const fs = require("fs");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
require("./db/connections")(); // Initialize database connections

// Middleware
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Log HTTP requests

// Enable CORS middleware for all routes (allow all origins)
app.use(cors({origin : "*"}));  // Use cors middleware

app.use(
  session({
    secret: "SECRET KEY",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `${process.env.MONGODB_URI}${process.env.DB_NAME}`,
      ttl: 14 * 24 * 60 * 60, // 14 days
      autoRemove: "native",
    }),
  })
);

// Ensure the 'routes' directory exists
if (fs.existsSync("./routes")) {
  // Dynamically load all route files from the 'routes' directory
  fs.readdirSync("./routes").forEach(function (file) {
    app.use("/api", require(`./routes/` + file)); // Use each route file with the base path '/api'
  });
} else {
  console.error("Routes directory does not exist.");
}

// Start the server
app.listen(port, () => {
  console.log(`Server run on port ${port}`); // Log that the server is running
});
