const express = require("express"); // Express
const graphqlHTTP = require("express-graphql"); // Express connecting package and naming convention
const schema = require("./schema/schema");
require("dotenv").config(); // Config .env
const mongoose = require("mongoose");
const cors = require("cors");

const server = express(); // Create new server

server.use(cors());

// Connect to MongoDB Atlas database
mongoose.connect(process.env.DB_URI);
mongoose.connection.once("open", () => {
  console.log(`
         Connected to Database
  -------------------------------------
  `);
});

// Server use GraphQL with /graphql endpoint
server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true // Allows users to access the GraphiQL tool in the browser
  })
);

const port = process.env.SERVER_PORT || 8000; // Dynamic port assignment via .env

server.listen(port, () =>
  console.log(`
  -------------------------------------
      Server Listening on Port ${port}
  `)
);