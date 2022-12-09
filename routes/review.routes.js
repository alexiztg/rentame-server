//http://localhost:5005/api/shops
//1. Generar el router
const router = require("express").Router()
const Review = require("../models/Review.Model")
const mongoose = require("mongoose")

//2. Generar las rutas
//Create - POST - Crear una nueva review 
router.post("/shops/:id/review/create", async (req,res)=>{
    try{
        
        const {id} = req.params;
        console.log(id);
        //Validamos que el ID sea correcto
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Specified id is not valid' });
            return;
          }
        //POST - Model.create(datos)
        const reviewCreate = await Review.create(req.body)
        res.json(reviewCreate)
    }catch(err){
        console.log(err);
    }
});

//Read - GET - General/todas las reviews
router.get("/shops/:id/review/",async (req,res)=>{
    try{
        //GET - Model.find(filtro?)
        const reviews = await Review.find();
        res.json(reviews);
    }catch(err){
        console.log(err);
    }
});

//Read - GET - Detalle de una review
router.get("/shops/:id/review/:id",async (req,res)=>{
    try{
        console.log(req.params);
        const {id} = req.params;
        //Validamos que el ID sea correcto
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Specified id is not valid' });
            return;
          }
        //GET - Model.findById(id)
        const reviewDetails = await Review.findById(id)
        res.json(reviewDetails)
    }catch(err){
        console.log(err);
    }
});

//Update - PUT - Actualizar una shop 
router.put("/shops/:id/review/:id",async (req,res)=>{
    try{
        const {id} = req.params;
         //Validamos que el ID sea correcto
         if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Specified id is not valid' });
            return;
          }
         //PUT - Model.findByIdAndUpdate(id, nuevosDatos,{new:true})
         const reviewActualizada = await Review.findByIdAndUpdate(id,req.body,{new:true}) 
        res.json(reviewActualizada)
    }catch(err){
        console.log(err);
    }
    
});

//Delete - DELETE - Eliminar una shop 
router.delete("/shops/:id/review/:id", (req,res)=>{
    const {id} = req.params;
    //Validamos que el ID sea correcto
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }
    //Delete - Model.findByIdAndDelete(id)
    Review.findOneAndDelete(id)
    .then((reviewEliminada)=>{
        res.json(reviewEliminada)
    })
    .catch((err)=>console.log(err))  
    
});

module.exports = router;