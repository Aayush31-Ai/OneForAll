
import connectDB from "./src/db/db.js"
import httpServer from "./src/socket/socket.js"
connectDB()

httpServer.listen(process.env.PORT, () => 
    console.log(`server is running on port ${process.env.PORT}`))