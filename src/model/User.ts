import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  id: { type: String },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  products: { type: Schema.Types.ObjectId, ref: 'Product' },
  categories: { type: Schema.Types.ObjectId, ref: 'Category' },
  recovery_codes: { type: Schema.Types.ObjectId, ref: 'RecoveryCode' },
})

const User = mongoose.model('User', userSchema)

export default User
