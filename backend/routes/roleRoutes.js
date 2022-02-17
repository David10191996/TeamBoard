import express from "express";
import roleController from "../controllers/roleController.js";

//express.Router me permite utilizar todas las funciones de http Get,POST, Detele,Put etc
const router = express.Router(); 


//http:Localhost:3001/api/role/registerRole
//le paso el final de la direccion y luego  si le indico que va ir a buscar.
router.post("/registerRole", roleController.registerRole) // Solo se indicar como terminar la ruta cuando vaya a buscar la funcion, en este caso registerRole

export default router

