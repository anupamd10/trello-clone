import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'
import { signToken } from '../utils/jwt.js'

export const authService = {
  register: async (name, email, password) => {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      const err = new Error('Email already in use')
      err.status = 409
      throw err
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ data: { name, email, password: hashed } })
    const token = signToken({ id: user.id, email: user.email })
    return { token, user: { id: user.id, name: user.name, email: user.email } }
  },

  login: async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      const err = new Error('Invalid credentials')
      err.status = 401
      throw err
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      const err = new Error('Invalid credentials')
      err.status = 401
      throw err
    }
    const token = signToken({ id: user.id, email: user.email })
    return { token, user: { id: user.id, name: user.name, email: user.email } }
  },
}
