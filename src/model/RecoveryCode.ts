import mongoose from 'mongoose'

const { Schema } = mongoose

const recoveryCodeSchema = new Schema({
  id: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, require: true, unique: true },
  used: { type: Boolean, require: true, default: false },
  expiration: { type: Date, required: true },
})

const RecoveryCode = mongoose.model('RecoveryCode', recoveryCodeSchema)

export default RecoveryCode
