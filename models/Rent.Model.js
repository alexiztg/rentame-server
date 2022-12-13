const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const rentSchema = new Schema(
  {
    available:{
        type: Boolean,
        required: true
    },
    date_start: {
        type: Date,
        required:true,
        trim: true,
    },
    date_end: {
        type: Date,
        trim: true,
        required:true
    },
    shop:{
      type: Schema.Types.ObjectId,
      ref:"Shop"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Rent = model("Rent", rentSchema);

module.exports = Rent;