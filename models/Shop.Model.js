const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const shopSchema = new Schema(
  {
    name: {
        type:String,
        required:true 
    },
    address:{
        type:String,
        required:true 
    },
    cost:{
        type:Number,
        required:true 
    },
    colony: {
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:true 
    },
    image: {
      type:String,
      default: "https://www.linkpicture.com/q/Store.png"
    },
    owner:{
      type: Schema.Types.ObjectId,
      ref:"User"
    },
    rent:[{
      //Se agrega el arreglo entre [] porque tiene relacion de 1:N
      type:Schema.Types.ObjectId, ref:"Rent"
    }]
    ,
    review:[{
      //Se agrega el arreglo entre [] porque tiene relacion de 1:N
      type:Schema.Types.ObjectId, ref:"Review"
    }]
  }
  ,
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Shop = model("Shop", shopSchema);

module.exports = Shop;