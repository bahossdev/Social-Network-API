# Social-Network-API

an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.javascript.com)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)

## Description

This project is a backend application developed for a social network, utilizing MongoDB, Express.js, and Mongoose. The API is designed to handle large amounts of unstructured data, a common requirement for social networking platforms. Users can share thoughts, react to friends' thoughts, and manage their friend lists through this API.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [Credits](#credits)
- [License](#license)
- [Walkthrough](#walkthrough)
- [Repository](#repository)
- [Questions](#questions)
- [Screenshots](#screenshots)

## Features

- **Get All Users and Thoughts:**
  - Retrieve a list of all users and thoughts through dedicated API endpoints.
- **Get Single User and Thought:**
  - Access detailed information about a specific user or thought by querying their unique identifier.
- **Create User and Thought:**
  - Add new users and thoughts to the system by making API POST requests with the relevant data.
- **Update User and Thought:**
  - Modify existing user and thought information using API PUT requests, providing the updated details.
- **Delete User and Thought:**
  - Remove users and thoughts from the system by making API DELETE requests with the respective identifiers.
- **Manage Friend Lists:**
  - Add or remove friends to a user's friend list through dedicated API routes.
- **React to Thoughts:**
  - Users can react to thoughts by creating and deleting reactions via the appropriate API endpoints.

## Technologies Used

- [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.javascript.com)
- [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
- [![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
- [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)

## Installation

Follow these steps to set up the Social Network API on your local machine:

1.  Clone the repository: `git clone https://github.com/bahossdev/Social-Network-API.git`
2.  Install dependencies: `npm install`
3.  Seed the database with sample data: `npm run seed`
4.  Start the application: `npm start`


## How to Use

To run it on your local machine, follow the steps below:

1.  Ensure the application is running by executing `npm start`.
2.  Open your preferred API testing tool (e.g., [Insomnia](https://insomnia.rest/), [Postman](https://www.postman.com/)).
3.  Test the available API routes:

    - **Get All Users and Thoughts:**

      ```
      GET /api/users
      GET /api/thoughts
      ```

    - **Get Single User and Thought:**

      ```
      GET /api/users/:userId
      GET /api/thoughts/:thoughtId
      ```

    - **Create User and Thought:**

      ```
      POST /api/users
      POST /api/thoughts
      ```

      Example JSON for creating a user:

      ```json
      {
        "username": "exampleUser",
        "email": "user@example.com"
      }
      ```

      Example JSON for creating a thought:

      ```json
      {
        "thoughtText": "This is a new thought.",
        "username": "exampleUser"
      }
      ```

    - **Update User and Thought:**

      ```
      PUT /api/users/:userId
      PUT /api/thoughts/:thoughtId
      ```

    - **Delete User and Thought:**

      ```
      DELETE /api/users/:userId
      DELETE /api/thoughts/:thoughtId
      ```

    - **Manage Friend Lists:**

      ```
      POST /api/users/:userId/friends/
      ```

      Example JSON for adding a friend:

      ```json
      {
      "_id_": "<id of an existing user>"
      }
      ```

      ```
      DELETE /api/users/:userId/friends/:friendId
      ```

    - **React to Thoughts:**
      ```
      POST /api/thoughts/:thoughtId/reactions
      DELETE /api/thoughts/:thoughtId/reactions/:reactionId
      ```

Now, the API is ready for testing and exploration. Adjust the routes and data according to your needs and explore the various functionalities provided by the Social Network API.

## Credits

This app was developed with insights from various educational resources, including documentation for MongoDB and Mongoose, Express.js, Insomnia and NoSQL.

## License

Please refer to the license in the repository for detailed information on the license governing this project.

## Walkthrough

- [Link to the walkthrough video](https://drive.google.com/file/d/1YPDGpxXXa8p7UcQ0AnXIt0kpDoC2q8dd/view?usp=share_link)

## Repository

- [Link to the Repo](https://github.com/bahossdev/Social-Network-API.git)

## Questions

If you have any questions or need further assistance, feel free to reach out to me by [email](mailto:bahoss.dev@gmail.com).

## Screenshots
![screenshot](https://github.com/bahossdev/Social-Network-API/assets/148646212/d03a982c-377e-4d17-bc4f-3eea4bc4ec83)
![screeenshot2](https://github.com/bahossdev/Social-Network-API/assets/148646212/4949d9da-d9b3-48d1-9145-a16d4841d192)

