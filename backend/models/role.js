//Importamos la libreria para administrar la BD a traves de Js
import mongoose from "mongoose";

//Creamos una objeto roleSchema de tipo mongoose.Schema que va a contener la estructura del json
const roleSchema = new mongoose.Schema({
  name: String,
  description: String,
  registerDate: { type: Date, default: Date.now }, // sacamos la hora actual del sistema
  dbStatus: Boolean, //sirve par 'borrar'/ocultar un registro en este caso un rol
});

// creamos una variable role, que contendra el objeto con la estructura json
const role = mongoose.model("roles", roleSchema);
export default role; //exportamos role para usarlo en otros archivos js
