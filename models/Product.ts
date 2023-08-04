import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    basePlace: {
      type: String,
      required: true
    },
    imageSrc: {
      type: String,
      default: ''
    },
    priceOfProduct: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)
export default mongoose.models.Product || mongoose.model('Product', ProductSchema)