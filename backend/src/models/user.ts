import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    methods: {
      async comparePassword(password: string) {
        return await bcrypt.compare(password, this.password);
      },
      async generateAuthToken() {
        const JWT_SECRET = String(process.env.JWT_SECRET);
        const JWT_EXPIRY = String(process.env.JWT_EXPIRY);

        if (!JWT_SECRET) throw new Error("JWT_SECRET not defined");
        if (!JWT_EXPIRY) throw new Error("JWT_EXPIRY not defined");

        const jwtOptions = {
          algorithm: "HS256",
          expiresIn: JWT_EXPIRY,
        } as jwt.SignOptions;

        const token = jwt.sign({ id: this._id }, JWT_SECRET, jwtOptions);
        return token;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

const User = mongoose.model("User", userSchema);
export default User;
export { userSchema };
export type { User as UserType, userSchema as UserSchemaType };
