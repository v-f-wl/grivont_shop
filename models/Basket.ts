import mongoose from 'mongoose'

const BasketSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    collectionBag: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
)
export default mongoose.models.Basket || mongoose.model('Basket', BasketSchema)