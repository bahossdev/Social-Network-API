const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users } = require("./data");
const { thoughts } = require("./data");
const { generateEmail, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

  console.log("users: ", users);
  console.log("thoughts: ", thoughts);

  // Generate emails for users
  const userEmails = users.map(generateEmail);

  // Add users to the collection and await the results
  const userData = await User.insertMany(
    users.map((name, index) => ({
      username: name,
      email: userEmails[index],
    }))
  );

  // Create an array to store associations of thoughts with users
  const thoughtsWithUsers = thoughts.reduce((accumulator, thought, index) => {
    const randomUser =
      userData[Math.floor(Math.random() * userData.length)].username;

    accumulator.push({
      thoughtText: thought,
      username: randomUser,
      reactions: [],
    });
    // // Update the user with the new thought
    // randomUser.thoughts.push({
    //   thoughtText: thought,
    // });

    return accumulator;
  }, []);

  // Insert thoughts with user associations into the Thought collection
  const thoughtData = await Thought.insertMany(thoughtsWithUsers);
  
  // Save the updated user data with populated thoughts
  const updatedUserData = await User.find().populate("thoughts").select("-__v");
  
  // Log out the seed data to indicate what should appear in the database
  console.table(updatedUserData);
  console.table(thoughtData);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
