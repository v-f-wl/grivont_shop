import mongoose from 'mongoose'

const BasketSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    collection: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true
  }
)
export default mongoose.models.Basket || mongoose.model('Basket', BasketSchema)