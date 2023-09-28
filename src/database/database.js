const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

database.$connect().then(value => {
  console.log("🚀 ~~ file: database.js:6 ~~ database.$connect ~~ value:", value);

  console.log("Connected to database");
});

module.exports = database;
