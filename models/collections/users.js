
import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        //estructura del objeto, propiedades y tipos de datos
        id:{
            type: mongoose.Types.ObjectId
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        profile: {
            type: String
        },
        active:{
            type: Boolean
        }
    },
    {
        //marcas de tiempo
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('users', userSchema)