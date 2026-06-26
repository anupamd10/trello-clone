import { verifyToken } from '../utils/jwt.js'

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })

  const token = header.slice(7)
  const user = verifyToken(token)
  if (!user) return res.status(401).json({ error: 'Invalid or expired token' })

  req.user = user
  next()
}
