const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {

        const users = await User.find().select("-__v");

        // Update each user by adding thoughts
        for (const user of users) {
          const thoughtsToAdd = await Thought.find({ username: user.username });
  
          // Add the thoughts to the user's 'thoughts' array
          const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { thoughts: { $each: thoughtsToAdd } } },
            { runValidators: true, new: true }
          );
        }
  
        // Fetch the updated users after all updates are complete
        const updatedUsers = await User.find()
          .select("-__v");

      res.json(updatedUsers);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {

      const user = await User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts", "-__v")
      .populate("friends", "-__v");

      res.json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      const updatedUser = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );
      res.json([{ message: "User Updated successfully! 🤓" }, updatedUser]);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user and remove them from the thought
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      //Bonus: Remove a user's associated thoughts when deleted.
      const thought = await Thought.deleteMany({ username: user.username });

      if (!thought) {
        return res.status(404).json({
          message: "User deleted, but no thoughts found",
        });
      }

      res.json({
        message: "User and associated thoughts successfully deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an friend to a user
  async addFriend(req, res) {
    console.log("You are adding an friend");

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json([{ message: "🤩 They are now friends! 👬" }, user]);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove friend from a user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }
      const updatedUser = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );
      res.json([{ message: "They are not friends anymore 😞💔" }, updatedUser]);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
