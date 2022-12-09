//http://localhost:5005/api/shops
//1. Generar el router
const router = require("express").Router()
const Rent = require("../models/Rent.Model")
const ValidId = require("../middleware/ValidId")

//2. Generar las rutas
//Create - POST - Crear una nueva rent 
router.post("/shops/:id/rent/create",ValidId, async (req,res)=>{
    try{
        const {id} = req.params;
        //POST - Model.create(datos)
        const rentCreate = await Rent.create(req.body)
        res.json(rentCreate)
    }catch(err){
        console.log(err);
    }
});

//Read - GET - General/todas las rents
router.get("/shops/:id/rent/",ValidId, async (req,res)=>{
    try{
        const {id} = req.params;
        //GET - Model.find(filtro?)
        const rents = await Rent.find();
        res.json(rents);
    }catch(err){
        console.log(err);
    }
});

//Read - GET - Detalle de una rent
router.get("/shops/:id/rent/:id",ValidId, async (req,res)=>{
    try{
        const {id} = req.params;
        //GET - Model.findById(id)
        const rentDetails = await Rent.findById(id)
        res.json(rentDetails)
    }catch(err){
        console.log(err);
    }
});

//Update - PUT - Actualizar una shop 
router.put("/shops/:id/rent/:id",ValidId, async (req,res)=>{
    try{
        const {id} = req.params;
         //PUT - Model.findByIdAndUpdate(id, nuevosDatos,{new:true})
         const rentActualizada = await Rent.findByIdAndUpdate(id,req.body,{new:true}) 
        res.json(rentActualizada)
    }catch(err){
        console.log(err);
    }
});

//Delete - DELETE - Eliminar una shop 
router.delete("/shops/:id/rent/:id",ValidId, (req,res)=>{
    const {id} = req.params;
    //Delete - Model.findByIdAndDelete(id)
    Rent.findOneAndDelete(id)
    .then((rentEliminada)=>{
        res.json(rentEliminada)
    })
    .catch((err)=>console.log(err))  
});

module.exports = router;