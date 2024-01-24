const users = [
  'John Smith',
  'Megan Williams',
  'Mike Oliver',
  'Parsa Shadman',
  'Feng Li',
  'James Clark',
  'David Lance',
  'Rene Alfonso',
  'Drew McDonald',
  'Samantha Baker',
  'Sarah Alexis',
  'Jack Parker',
];

const thoughts = [
  "I think practice is the key to become a good programmer.",
  "I am so excited about the upcoming JavaScript course.",
  "Just discovered a new coding technique!",
  "The more I learn, the more I realize how much I don't know.",
  "Coding is an art, and I'm the artist!",
  "Just had a breakthrough moment in debugging. Celebrating small victories!",
  "Feeling a bit stuck today, but I won't give up.",
  "Coding is not just a job; it's a way of life.",
  "The joy of finding a semicolon in the right place!",
  "Pair programming is so much fun!",
  "Trying to master asynchronous programming. It's a challenge, but I love it!",
  "Joined a coding meetup today. Met some amazing fellow developers.",
  "Attended a tech conference and got inspired by the latest innovations.",
  "I believe in the power of open source. Contributing to my favorite projects.",
  "The satisfaction of refactoring code for better performance.",
  "Found a solution on Stack Overflow that saved my day!",
  "Diving into machine learning. Excited about the endless possibilities.",
  "Today is all about algorithms and data structures!",
  "Dreaming in code. Is that a good sign or a coding overdose?",
  "The best part of coding: turning ideas into reality.",
  "My code might not be perfect, but it's a work in progress.",
  "Impostor syndrome is real, but I won't let it hold me back.",
  "Debugging is like detective work. Solving mysteries one line at a time.",
  "Teaching someone to code and seeing the 'aha' moment is priceless.",
];


// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateEmail = (fullName) => {
  const [firstName, lastName] = fullName.split(' ');
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
};

// Assign random thoughts to users.
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { users, thoughts, generateEmail, getRandomThoughts };
