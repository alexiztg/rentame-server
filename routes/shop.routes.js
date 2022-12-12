//http://localhost:5005/api/shops
//1. Generar el router
const router = require("express").Router()
const Shop = require("../models/Shop.Model")
const ValidId = require("../middleware/ValidId")


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
        //.populate("llaves")
        const shops = await Shop.find().populate("rent").populate("review")
        res.json(shops);
    }catch(err){
        console.log(err);
    }
});

//Read - GET - Detalle de una shop
router.get("/shops/:id",ValidId, async (req,res)=>{
    try{
        const {id} = req.params;
        //GET - Model.findById(id)
        const shopDetails = await Shop.findById(id)
        res.json(shopDetails)
    }catch(err){
        console.log(err);
    }
});

//Update - PUT - Actualizar una shop 
router.put("/shops/:id",ValidId, async (req,res)=>{
    try{
        const {id} = req.params;
         //PUT - Model.findByIdAndUpdate(id, nuevosDatos,{new:true})
         const shopActualizada = await Shop.findByIdAndUpdate(id,req.body,{new:true}) 
        res.json(shopActualizada)
    }catch(err){
        console.log(err);
    }
});

//Delete - DELETE - Eliminar una shop 
router.delete("/shops/:id",ValidId, (req,res)=>{
    const {id} = req.params;
    //Delete - Model.findByIdAndDelete(id)
    Shop.findOneAndDelete(id)
    .then((shopEliminada)=>{
        res.json(shopEliminada)
    })
    .catch((err)=>console.log(err))  
});

module.exports = router;