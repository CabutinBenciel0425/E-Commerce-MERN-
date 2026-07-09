import bcrypt from "bcryptjs";
import mongoose, { model, Schema } from "mongoose";
import { BCRYPT_SALT_ROUNDS } from "../config/constants.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
      trim: true,
      minlength: [6, "Password must be atleast 6 characters long"],
      maxlength: 100,
      select: false,
    },
    image: {
      type: String,
      default: "",
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true },
);
//cannot use next if async/await
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;
