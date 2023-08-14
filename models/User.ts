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

    orderHistory: [
      {
        orderNumber: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        totalCount: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now },
        items: [
          {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            image: { type: String },
            title: { type: String },
            count: { type: Number, default: 1 },
            _id: { type: String },
          }
        ],
        status: { type: String, default: false },
      }
    ],
    cart: [
      {
        count: { type: Number, default: 1 },
        productId: { type: String, required: true }
      }
    ],
    passwordHash: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)
const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)

export default UserModel