import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

  const hashPassword = bcrypt.hashSync(user.password, salt);

  user.password = hashPassword;

  return next();
});

userSchema.methods.comparePassword = async function (
  condidatePassword: string
): Promise<boolean> {
  let user = this as UserDocument;

  return bcrypt
    .compare(condidatePassword, user.password)
    .catch((error) => false);
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
