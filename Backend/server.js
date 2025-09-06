import app from "./src/app.js"
import connectDB from "./src/db/db.js"
connectDB()


app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))