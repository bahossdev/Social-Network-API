const { Schema, model, Types } = require("mongoose");
const reactionSchema = require('./Reactions');

const thoughtSchema = new Schema({
  thoughtId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    toJSON: {
      getters: true,
    },
    id: false,
  },
  username: {
    required: true,
    ref: "student",
  },
  reactions: [reactionSchema],
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);
module.exports = Thought;