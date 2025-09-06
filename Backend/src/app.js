import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRouter from './router/auth.route.js'
import chatRouter from './router/chat.route.js'
const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()



app.use("/auth",authRouter)
app.use("/chat",chatRouter)

export default app