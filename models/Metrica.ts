import mongoose from 'mongoose'

const MetricSchema = new mongoose.Schema(
  {
    productCategories: {
      type: Array,
      default: []
    },
    popularProducts: {
      type: Array,
      default: []
    },
    popularEvents: {
      type: Array,
      default: []
    },
  },
  {
    timestamps: true
  }
)
export default mongoose.models.Metric || mongoose.model('Metric', MetricSchema)