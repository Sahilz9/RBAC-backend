const express = require("express");
const cookieparser = require("cookie-parser");
const connectDB = require("./utils/db");
const cors = require("cors");
const morgan = require("morgan");
const AuthRoutes = require("./routes/Auth");
const AdminRouter = require("./utils/AdminRoute");
const { isUser } = require("./middleware/verifyToken");
const eventRoute = require("./routes/EventRoute");
require("dotenv").config();
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJSdoc = require("swagger-jsdoc");
const openapiSpecification = require("./jsdoc");

const port = process.env.PORT || 3001;
app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieparser());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Authentication and Events Dashboard",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:9090",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/api/auth", AuthRoutes);
app.use("/api/admin", AdminRouter);
app.use("/api/event", isUser, eventRoute);

app.get("/", (req, res) => {
  res.send("Home Route");
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${port}`);
});
