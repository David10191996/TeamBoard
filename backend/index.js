import express from "express"; //importamos la libreria para la configuracion del servidor, es el servidor
import cors from "cors"; // importamos libreria para normas,seguridad de protocolos de comunicacion del servidor
import db from "./db/db.js"; //traemos el modulo de la conexion a base de datos
import dotenv from "dotenv"; //Configura el proyecto para usar el archivo .env
import roleRoutes from "./routes/roleRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config(); //llamamos la configuracion para leer .env

const app = express(); // traemos todas las funciones de express *app es mi servidor*
app.use(express.json()); // solo trabajara en formato json en este servidor
app.use(cors()); // traemos la libreria para los protocolos de seguridad de peticiones http

app.use("/api/role",roleRoutes) // "api es por estandar, pero puede ir cualqueir nombre"
app.use("/api/user",userRoutes) // De aqui vamos directo a userRouter que tiene el resto de la ruta.


app.listen(process.env.PORT, () =>
  // Solicitamos al sistema operativo la utilizacion del puerto donde necesitamos trabajar
  console.log("Backend server running on port: ", process.env.PORT)
);

db.dbConnection(); //Aqui llamamos la funcion de conexion del modulo db en la carpeta db


//para iniciar el Servidor npm start y para terminarlo con ctrl + c