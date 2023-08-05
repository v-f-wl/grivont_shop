import mongoose from 'mongoose'

const FavoriteSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    collectionFavotite: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
)
export default mongoose.models.Favorite || mongoose.model('Favorite', FavoriteSchema)