const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/AuthRoute");
const analyticsRoutes = require("./routes/AnalyticsRoute");
const userRoutes = require("./routes/UserRoute.js");
const connectDB = require('./config/db.js');
const reviewRoutes = require('./routes/ReviewRoute.js');
const courseRoutes = require("./routes/CourseRoute.js");
const {protect} = require('./middlewares/AuthMiddleware.js')
const chatbotRouter = require('./routes/chatBotRoute.js');


// dotenv.config();
require("dotenv").config();
connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes); 
app.use('/api/reviews',reviewRoutes);
app.use('/api/chatbot',chatbotRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));