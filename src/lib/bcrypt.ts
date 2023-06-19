import bcrypt from 'bcrypt'

export async function generateHash(password: string) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
  } catch (error) {
    console.log('Error generating hash: ', error)
  }
}

export async function compareHash(password: string, hash: string) {
  const result = await bcrypt.compare(password, hash)
  return result
}
