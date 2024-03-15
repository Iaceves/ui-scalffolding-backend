const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./backend/middleware/errorMiddleware");
const connectDB = require("./backend/config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./backend/routes/userRoutes"));
app.use("/api/teams", require("./backend/routes/teamRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on port ${port}`));
