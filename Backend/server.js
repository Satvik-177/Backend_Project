import app from "./src/app.js"
import dotenv from "dotenv"
import connectToDB from "./src/config/db.js"

dotenv.config()

await connectToDB()

app.listen(3000,()=>{

    console.log("Server is listening on port 3000")
})