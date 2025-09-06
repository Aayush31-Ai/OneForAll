import mongopose from "mongoose";

const chatSchema = new mongopose.Schema({
    userId:{
        type: mongopose.Schema.Types.ObjectId,
        ref: "user",
        required: true  
    },
    title:{
        type: String,
        required: true
    },
  lastActivity: {
    type: Date,
    default: Date.now
  }
},{
    timestamps: true
});

const chat = mongopose.model("chat",chatSchema);
export default chat