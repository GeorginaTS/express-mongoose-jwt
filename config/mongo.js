
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose" 


export default function dbConnect() {
    const dbUri = process.env.DB_URI;
    mongoose.connect(dbUri).then((response) => {
        console.log('😊 Success connection')
    }).catch((error) => {
        console.log('!!!! Error connection !!!!', error)
    })
}
