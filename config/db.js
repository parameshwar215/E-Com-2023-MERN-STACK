import mongoose from "mongoose";
import colors from "colors";
import dotenv from 'dotenv';


dotenv.config();
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(`${process.env.mongo_url}`)
       console.log(`Coneccted to mongodb database ${conn.connection.host}`.bgMagenta.white)

    }catch(error){
        console.log(`Error in Mongodb ${error}`.bgBlack.red)
    }
}
export default connectDB;