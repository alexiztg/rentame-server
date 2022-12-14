//http://localhost:5005/api/shops
//1. Generar el router
const router = require("express").Router()
const Review = require("../models/Review.Model")
const ValidId = require("../middleware/ValidId")
const Shop = require("../models/Shop.Model")


//2. Generar las rutas
//Create - POST - Crear una nueva review 
router.post("/shops/:id/review/create",ValidId, async (req,res)=>{
    try{
        const {id} = req.params;
        //POST - Model.create(datos)
        const reviewCreate = await Review.create(req.body)
        //Vinculamos la nueva review con la Shop
        console.log(reviewCreate);
        const {_id} = reviewCreate
        const shopActualizada = await Shop.findByIdAndUpdate(id,{$push:{review:_id}},{new:true})
        console.log("uno",shopActualizada);
        res.json(reviewCreate)
    }catch(err){
        console.log(err);
    }
});

//Read - GET - General/todas las reviews
router.get("/shops/:id/review/", ValidId, async (req,res)=>{
    try{
        const {id} = req.params;
        //GET - Model.find(filtro?)
        const reviews = await Review.find();
        res.json(reviews);
    }catch(err){
        console.log(err);
    }
});

//Read - GET - Detalle de una review
router.get("/shops/:id/review/:id",ValidId, async (req,res)=>{
    try{
        const {id} = req.params;
        //GET - Model.findById(id)
        const reviewDetails = await Review.findById(id)
        res.json(reviewDetails)
    }catch(err){
        console.log(err);
    }
});

//Update - PUT - Actualizar una shop 
router.put("/shops/:id/review/:id",ValidId, async (req,res)=>{
    try{
        const {id} = req.params;
         //PUT - Model.findByIdAndUpdate(id, nuevosDatos,{new:true})
         const reviewActualizada = await Review.findByIdAndUpdate(id,req.body,{new:true}) 
        res.json(reviewActualizada)
    }catch(err){
        console.log(err);
    }
    
});

//Delete - DELETE - Eliminar una shop 
router.delete("/shops/:id/review/:id",ValidId, (req,res)=>{
    const {id} = req.params;
    //Delete - Model.findByIdAndDelete(id)
    Review.findOneAndDelete(id)
    .then((reviewEliminada)=>{
        res.json(reviewEliminada)
    })
    .catch((err)=>console.log(err))  
});

module.exports = router;