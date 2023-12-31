const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginLandingPageLocalDefault,

  ApolloServerPluginLandingPageProductionDefault
} = require("@apollo/server/plugin/landingPage/default");

const port = process.env.PORT || 3000;
const { initDb } = require("./db/connection");
const { schema, typeDefs } = require("./schemas/schema"); // imports file of the resolvers and typesdefs
const { verifyToken } = require("./middlewares/verifyToken");

// Start Apollo Server and GraphQL at /graphql
async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    schema,
    typeDefs,
    introspection: true,
    cors: {
      origin: "*",
      credentials: true
    },
    context: async ({ req }) => {
      let isAuthenticated = false;
      try {
        const authHeader = req.headers.authorization || "";
        if (authHeader) {
          const token = authHeader.split(" ")[1];
          const payload = await verifyToken(token);
          isAuthenticated = payload && payload.sub ? true : false;
        }
      } catch (error) {
        console.error(error);
      }
      return { isAuthenticated };
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault({ embed: true })
        : ApolloServerPluginLandingPageLocalDefault({ embed: false })
    ]
  });
  await apolloServer.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(apolloServer));

  // middleware setup
  app.use("/", require("./routes")).use((req, res, next) => {
    // custom middleware to set headers for CORS and content type
    res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    ); // Define allowed headers
    res.setHeader("Content-Type", "application/json"); // set response content type to JSON
    next();
  });

  process.on("warning", (e) => console.warn(e.stack));

  app.listen(port, () => {
    console.log(`🚀 Web Server is listening at port ${port}`);
    console.log(`📂 GraphQL doc available at http://localhost:${port}/graphql`);
  });
}

// Initialize db connection
initDb((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to MongoDB");
    // Start the Apollo Server after successful DB connection
    startServer().catch((error) => {
      console.error("Error starting server:", error);
    });
  }
});
