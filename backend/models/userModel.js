const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
    },
    settings: {
      
      usersettings: {

        showProfilePic: {
          type: Boolean,
          default: false,
        },

        showMessage: {
          type: Boolean,
          default: false,
        },

        allowTagging: {
          type: Boolean,
          default: false
        }
      }
    }
  },
  { timestamps: true }
);

const user = mongoose.model("User", User);

module.exports = user;
