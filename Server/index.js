const express = require('express')
const cors = require('cors')
const mongoose =require ('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

//Schema

const perros =mongoose.Schema({
    Nombre: String,
    Numero_Empleado: Number,
    Status: String,
    CorreoElectronico: String,
    Area: String,
    Sede: String,
    FecahaNacimiento: Date,
    Sexo: String,
    Contrato:String,
    Tipo:String
},{
    timestamps:true
})

const userModel =mongoose.model("perros",perros)

// read
app.get("/",async(req,res)=>{
    const data =await userModel.find({})
    res.json({success:true, data:data})
})

// Obtener un usuario por su ID
app.get("/user/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        res.json({ success: true, data: user });
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

//create data || save data in mongo
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data=new userModel(req.body)
    await data.save()
    res.send({success:true, message:"Data save successfully",data:data})
})

//update data
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {id,...rest}=req.body
    console.log(rest)
    const data = await userModel.updateOne({_id:id},rest)
    res.send({success:true, message:"Data update successfully",data:data})
})

//delete api
app.delete("/delete/:id",async (req,res)=>{
    const id =req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id:id})
    res.send({success:true, message:"Data delete successfully",data:data})

})

mongoose.connect("mongodb://127.0.0.1:27017/torres")
.then(()=>{console.log("Conectado a db")
app.listen(PORT,()=>console.log("Server Corriendo"))
})
.catch(()=>console.log(err))


