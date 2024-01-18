// db
import db from "./db.js";

export const resolvers = {
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
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000),
      };
      db.games.push(game);
      return game;
    },
    updateGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }
        return game;
      });
      return db.games.find((game) => game.id === args.id);
    },
    addAuthor(_, args) {
      let author = {
        ...args.author,
        id: Math.floor(Math.random() * 10000),
      };
      db.authors.push(author);
      return author;
    },
    deleteAuthor(_, args) {
      db.authors = db.authors.filter((author) => author.id !== args.id);
      return db.authors;
    },
    updateAuthor(_, args) {
      db.authors = db.authors.map((author) => {
        if (author.id === args.id) {
          return { ...author, ...args.edits };
        }
        return author;
      });
      return db.authors.find((author) => author.id === args.id);
    },
  },
};
