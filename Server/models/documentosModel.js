import mongoose from "mongoose";
const Schema = mongoose.Schema

const documentos = new Schema ({
    Nombre:String,
    Numero_Empleado:Number,
    Documento:[
        {
            Tipo:String,
            Folio:Number,
            URL:String,
            FechaSubida:Date,
            Caducidad:Date,
        }
    ]},
    {
        timestamps: true
    }
    )
export default mongoose.model("documento", documentos);
