const mongoose = require("mongoose")
function ValidId(req, res, next) {
console.log("Validamos Id");
const {id} = req.params;
//Validamos que el ID sea correcto
if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  //Si queremos que vaya al siguiente paso usamos NEXT
//next()
next();
}
module.exports = ValidId;