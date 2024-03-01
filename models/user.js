const mongoos = require("mongoose");
const userSchema = new mongoos.Schema(
  {
    username: {
      type: string,
      required: true,
    },
    password: {
      type: string,
      required: true,
    },
    first_name: {
      type: string,
      required: true,
    },
    last_name: {
      type: string,
      required: true,
    },
    telephone: {
      type: string,
      required: true,
    },
    roles: [
      {
        type: string,
        default: "not_admin",
      },
    ],
    active: {
      type: boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoos.model("User", userSchema);
