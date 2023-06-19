import mongoose from 'mongoose'

const { Schema } = mongoose

const productSchema = new Schema({
  id: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
})

const Product = mongoose.model('Product', productSchema)

export default Product
