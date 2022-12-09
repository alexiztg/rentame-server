//http://localhost:5005/api/shops
//1. Generar el router
const router = require("express").Router()
const Shop = require("../models/Shop.Model")
const mongoose = require("mongoose")

//2. Generar las rutas
//Create - POST - Crear una nueva shop 
router.post("/shops", (req,res)=>{
    //Los datos van a venir en req.body
    console.log(req.body);
    //POST - Model.create(datos)
    Shop.create(req.body)
    .then((shopCreada)=>{
        res.json(shopCreada)
    })
    .catch((err)=>console.log(err))
});

//Read - GET - General/todas las shops
router.get("/shops",async (req,res)=>{
    try{
        //GET - Model.find(filtro?)
        const shops = await Shop.find();
        res.json(shops);
    }catch(err){
        console.log(err);
    }
});

//Read - GET - Detalle de una shop
router.get("/shops/:id",async (req,res)=>{
    try{
        const {id} = req.params;
        //Validamos que el ID sea correcto
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Specified id is not valid' });
            return;
          }
        //GET - Model.findById(id)
        const shopDetails = await Shop.findById(id)
        res.json(shopDetails)
    }catch(err){
        console.log(err);
    }
});

//Update - PUT - Actualizar una shop 
router.put("/shops/:id",async (req,res)=>{
    try{
        const {id} = req.params;
         //Validamos que el ID sea correcto
         if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Specified id is not valid' });
            return;
          }
         //PUT - Model.findByIdAndUpdate(id, nuevosDatos,{new:true})
         const shopActualizada = await Shop.findByIdAndUpdate(id,req.body,{new:true}) 
        res.json(shopActualizada)
    }catch(err){
        console.log(err);
    }
    
});

//Delete - DELETE - Eliminar una shop 
router.delete("/shops/:id", (req,res)=>{
    const {id} = req.params;
    //Validamos que el ID sea correcto
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }
    //Delete - Model.findByIdAndDelete(id)
    Shop.findOneAndDelete(id)
    .then((shopEliminada)=>{
        res.json(shopEliminada)
    })
    .catch((err)=>console.log(err))  
    
});

module.exports = router;