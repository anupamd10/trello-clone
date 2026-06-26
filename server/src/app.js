import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import boardRoutes from './routes/board.routes.js'
import listRoutes from './routes/list.routes.js'
import cardRoutes from './routes/card.routes.js'
import { errorMiddleware } from './middleware/error.middleware.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || '*' }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/boards', boardRoutes)
app.use('/api/lists', listRoutes)
app.use('/api/cards', cardRoutes)

app.use(errorMiddleware)

export default app
