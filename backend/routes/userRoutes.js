import express from "express";
import userController from "../controllers/userController.js";
import userMidd from "../middleware/userValidate.js"; // Exportamos el archivo de middleware
import roleMidd from "../middleware/roleValidate.js";

//express.Router me permite utilizar todas las funciones de http Get,POST, Detele,Put etc
const router = express.Router();

//http:Localhost:3001/api/role/registerRole
//le paso el final de la direccion y luego  si le indico que va ir a buscar.
router.post(
  "/registerUser",
  userMidd.existingUser,
  roleMidd.existingRole,
  userController.registerUser
); // Solo se indicar como terminar la ruta cuando vaya a buscar la funcion, en este caso registerUser, la ruta viene desde index "/api/useruserRoutes/registerUser"

router.get("/listUser", userController.listUser);
router.get("/listRol", userController.listRol);

//Es importante llamar o exportar  las funciones necesarias, primero middleware en donde tendremos las validaciones y luego el controller quien es quien tiene la funcion para registrar al usuario.

export default router;
