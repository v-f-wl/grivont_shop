import mongoose from 'mongoose'

const FavoriteSchema = new mongoose.Schema(
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
export default mongoose.models.Favorite || mongoose.model('Favorite', FavoriteSchema)