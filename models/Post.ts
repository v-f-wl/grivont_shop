import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    likeCollection: {
      type: Array,
      default: []
    },
    commentCollection: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
)
export default mongoose.models.Post || mongoose.model('Post', PostSchema)