import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true
    },
    mainCategory: {
      type: String,
      default: ''
    },
    mainCategoryLink: {
      type: String,
      default: ''
    },
    categoryLink: {
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
    isDeleted: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: true
    },
    countOfProducts: {
      type: Number,
      default: 1
    },
    imageSrc: {
      type: Array,
      default: []
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