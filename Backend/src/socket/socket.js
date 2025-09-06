import { createServer } from "http";
import { Server } from "socket.io";
import app from "../app.js";
const httpServer = createServer(app);
 const io = new Server(httpServer, { /* options */ });
 import generateText from "../service/textGeneration.service.js";

io.on("connection", (socket) => {

    console.log("user connected");
    socket.on("disconnect", () => { 
        console.log("user disconnected");
    });
    socket.on("message",async(data)=>{
             const response= await generateText(data) 
     socket.emit("message",response)        
    })
    
})
export default httpServer