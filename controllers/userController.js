const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("thoughts").select("-__v");
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      const userInfo = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $addToSet: {
            thoughts: await Thought.find({ username: user.username }),
          },
        },
        { runValidators: true, new: true }
      )
      .populate('thoughts');

      res.json({userInfo});
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
        { $set: req.body},
        { runValidators: true, new: true }
      );
      const updatedUser = await User.findOne({ _id: req.params.userId }).select("-__v");      
      res.json([{ message: "User Updated successfully! 🤓" }, updatedUser]);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user and remove them from the thought
  async deleteUser(req, res) {
    try {
      // const username = await User.findOne({ _id: req.params.userId })
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }
      const thought = await Thought.deleteMany({ username: user.username });

      if (!thought) {
        return res.status(404).json({
          message: "User deleted, but no thoughts found",
        });
      }

      res.json({ message: "User and associated thoughts successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an friend to a user
  async addFriend(req, res) {
    console.log("You are adding an friend");
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json([{ message: "🤩 They are now freinds! 👬" }, user]);
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
      res.json([{ message: "They are not freinds anymore 😞💔" }, updatedUser]);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
