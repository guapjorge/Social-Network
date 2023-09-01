const { Schema, model } = require('mongoose');

// Schema to create Post model
const userSchema = new Schema(
  {
    username: {
        type: String ,
        unique: true,
        required: true,
        trim: true
    },
    email: { 
        type: String , 
        required: true, 
        unique: true, 
        match: [/.+@.+\..{2,6}/,"Must be a valid email"]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return `${this.friends}`
});

// Initialize our Post model
const User = model('User', userSchema);

module.exports = User;