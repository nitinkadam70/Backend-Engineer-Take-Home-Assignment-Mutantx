const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const scoreModel = require("./src/models/score.model");
const userModel = require("./src/models/user.model");
require("dotenv").config();

// taking command line arguments
const args = process.argv.slice(2);
const countArg = args.find((arg) => arg.startsWith("--count="));

// If --count is missing, show error and exit
if (!countArg) {
  console.error(
    "Error: Please provide a count. example: node mock_data.js --count=10"
  );
  process.exit(1);
}

// Here we are extracting number from "--count=10"
const count = parseInt(countArg.split("=")[1], 10);

// Here we are validating count
if (isNaN(count) || count <= 0) {
  console.error(
    "Error: Invalid count value. Please provide a positive integer."
  );
  process.exit(1);
}

// Here we are connecting database and called generateMockData function when db is connected
const MONGO_URL = process.env.MONGODB_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    generateMockData();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Here we are generating a Mock Data
async function generateMockData() {
  try {
    console.log(`Generating ${count} Users & ${count * 2} Scores...`);

    // 1. Here we are inserting Users
    const users = await Promise.all(
      Array.from({ length: count }, async () => {
        const hashedPassword = await bcrypt.hash(
          faker.internet.password({ length: 10 }),
          10
        );
        return {
          username: faker.internet.username(),
          email: faker.internet.email(),
          password: hashedPassword,
        };
      })
    );

    const insertedUsers = await userModel.insertMany(users);
    console.log(` Inserted ${insertedUsers.length} Users`);

    // 2. Here we are inserting random Scores based on points Options array
    const pointsOptions = [5, 10, 50];
    const scores = [];

    insertedUsers.forEach((user) => {
      // Generate 2 random scores per user
      for (let i = 0; i < 2; i++) {
        scores.push({
          userId: user._id,
          points: faker.helpers.arrayElement(pointsOptions),
        });
      }
    });

    await scoreModel.insertMany(scores);
    console.log(`Inserted ${scores.length} Scores`);
  } catch (err) {
    console.error("Error inserting mock data:", err);
  } finally {
    // Here we are closing DB connection when finished
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}
