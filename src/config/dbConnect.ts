import mongoose from 'mongoose'

async function connectToDatabase() {
  try {
    await mongoose.connect(`${process.env.DB_CONNECTION}`)
    console.log('Connected to the database!')
  } catch (error) {
    console.error('Error connection to database: ', error)
  }
}

export default connectToDatabase
