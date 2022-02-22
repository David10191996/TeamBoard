import role from "../models/role.js";

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    //Si nombre o descripcion no llego, entonces
    return res.status(400).send({ message: "Incomplete data" }); //saco un mensaje de error. res.status es para definir el erro y .send para enviarlo

  let schema = new role({
    //se crea un nuevo esquema(nueva instancia) con la informacion(estructura) de role.js
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });
  //async y await es la forma mas optima de hacer promesas. nos sirve para obligar hacer pausas a flujo normal del codigo.
  let result = await schema.save(); //schema.save damos la orden a mongo a guardar el json que viene

  if (!result)
    return res.status(500).send({ menssage: "Fallo to register role" });

  res.status(200).send({ result });
};

const listRol = async (req, res) => {
  let roles = await role.find();

  if (roles.length === 0)
    return res.status(400).send({ menssage: "No se encontraron resultados" });

  return res.status(200).send({ roles });
};

export default { registerRole, listRol };
