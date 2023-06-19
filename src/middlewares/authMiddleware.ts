import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

    req.user = decoded

    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export default authMiddleware
