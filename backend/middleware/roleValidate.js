import role from "../models/role.js";

const existingRole = async (req, res, next) => {
  const roleId = await role.findOne({ name: "user" });
  if (!roleId)
    return res.status(500).send({ menssage: "No role was assigned" });

  req.body.role = roleId._id; // Aqui asigno al body del req, es decir al json que viene en registrar, el id del role
                                // 

  // como agregar datos a un objeto en javascript

  next(); // este metodo me sirve para continuar con el flujo del programa
};

export default { existingRole };


// el req siempre me va a traer desde el front la url o el json o cualquier otro objeto.
// 