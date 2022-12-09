const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: true
    },
	title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    owner:{
      type: Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    ownerShop: {
      type: Schema.Types.ObjectId,
      ref:"Shop",
      required: true,
    }
  }
);
const Review = model("Review", reviewSchema);
module.exports = Review;