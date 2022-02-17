/**Este modulo db se va a encargar de la conexion a la base de datos */

/* importar la libreria para administrar db */

import mongoose from "mongoose";

/*Creamos un funcion para hacer la conexion a la bd */
const dbConnection = async () => {
  try {
   await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true, //Permite no mostrar la url de conexion en consola
      useUnifiedTopology: true, // Permite mostrar el codigo por consola sea mas entendible.
    }); // Process sirve para acceder al archivo .env(solo archivos ocultos ."nombre archivo" )
    console.log("Connetion with MongoDB: OK");
  } catch (e) {
    console.log("Error connecting to MongoDB: \n ",e);
  }
};

/**Exportamos esta funcion para llamarla o utilizarla desde otro modulo(archivo)  */
export default { dbConnection };
