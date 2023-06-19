import mongoose from 'mongoose'

const { Schema } = mongoose

const categorySchema = new Schema({
  id: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
})

const Category = mongoose.model('Category', categorySchema)

export default Category
