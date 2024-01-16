import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import db from "./db.js";

// types
import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
	resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 3000,
  },
});

console.log("Server ready at port", url);
