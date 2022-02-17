//creamos una carpeta intermedia, para hacer validaciones antes de que la ejecucion llegue al controller.
import user from "../models/user.js";

const existingUser = async (req, res, next) => {
  if (!req.body.email)
    return res.status(400).send({ menssage: "Incomplete data" });

  const existingEmail = await user.findOne({ email: req.body.email });
  if (existingEmail)
    return res.status(400).send({ menssage: "The User is already registered" });

  next();// me permite continuar con el  flujo del programa si se cumple la condicion anterior
};

export default { existingUser };
