const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Application",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:9090" }],
  },
  apis: ["./routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;
