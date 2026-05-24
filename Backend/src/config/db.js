import mongoose from "mongoose"

const connectToDB = async(req,res)=>{

    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected")
    }
    catch(err){
        console.log("error connecting db----", err)
        process.exit(1)
    }
}

export default connectToDB