import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true,
      unique: true
    },
    img: {
      type: String,
      default: ''
    },
    subscriptions: {
      type: Array,
      default: []
    },
    subscribers: {
      type: Array,
      default: []
    },
    passwordHash: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)
export default mongoose.models.User || mongoose.model('User', UserSchema)