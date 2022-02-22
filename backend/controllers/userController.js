import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send({ menssage: "Incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10); // encriptar password

  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    role: req.body.role, //aqui traigo el id del role que asignamos en roleValidate
    dbStatus: true,
  });

  const result = await userSchema.save();

  if (!result)
    return res.status(500).send({ menssage: "Failed to register user" });

  try {
    return res.status(200).json({
      // Aqui cambiamos el .send por el .json para enviar el jwt
      token: jwt.sign(
        //Llamamos la libreria, para encriptar o armar el jwt
        {
          _id: result._id, //traemos los datos que necesito guardar en jwt
          name: result.name,
          role: result.role,
          iat: moment().unix(), // iat:codigo basado en la fecha actual que se crea, moment.unix() crea encriptacion de la fecha
        },
        process.env.SK_JWT // accedemos al documento .env donde guardamos la palabra secreta que referencia este jwt
      ),
    });
  } catch (e) {
    return res.status(500).send({ mensagge: "Register error" });
  }
};

const listUser = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec(); // populate me muestra todo el sub-json, el find solo me trae el json user, exec es para ejecutar el populate
  //({name: new RegExp(req.params["name"])})  aqui filtramos la lista, .find me trae todo, pero si viene algun parametro en la URL lo filtro
  /* if (users.length === 0)
    return res.status(400).send({ mensagge: "No se encontraron resultados" });

  return res.status(200).send({ users });*/

  return users.length === 0
    ? res.status(400).send({ menssage: "No se encontraron resultados" })
    : res.status(200).send({ users });
};

const listUserAdmin = async (req, res) => {
  let users = await user
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: "true" }], // busco el nombre y  que el dbstatus es true
    })
    .populate("role")
    .exec();

  return users.length === 0
    ? res.status(400).send({ menssage: "No se encontraron resultados" })
    : res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await user.findOne({ email: req.body.email });

  if (!userLogin)
    return res.status(400).send({ menssage: "Wron email or Password" });

  if (!userLogin.dbStatus)
    return res.status(400).send({ menssage: "Wron email or Password" });

  const passHash = await bcrypt.compare(req.body.password, userLogin.password); // aqui comparo con el metodo "compare" de bcrypt el pass que ingresa el usuario con lo que hay registrado
  if (!passHash)
    return res.status(400).send({ menssage: "Wron email or Password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ mensagge: "Register error" });
  }
};

const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ menssage: "Incomplete Data" });

  const users = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !users
    ? res.status(400).send({ menssage: "Error delete User" }) // si no encuentra el id
    : res.status(200).send({ menssage: "user Delete!" }); // muestro el usuario eliminado
};

const updateUserAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    // Verifico que los campo del formulario no esten vacios.
    return res.status(400).send({ menssage: "Incomplete Data" });

  let pass = "";

  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email }); // si el campo password viene vacio, entonces asignamos el pass de la bd, indicando que no desea cambiarla
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10); // asignamso
  }

  const editUser = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
    role: req.body.role,
  });
  if (!editUser)
    return res.status(500).send({ menssage: "error editing user" });
  return res.status(200).send({ menssage: "User Update" });
};

//No borrar la siguiente funcion
/*
const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ menssage: "Incomplete Data" });

  const users = await user.findByIdAndDelete(req.params["_id"]); //buscamos por ID y luego lo elimino

  return !users
    ? res.status(400).send({ menssage: "Error delete User" }) // si no encuentra el id
    : res.status(200).send({menssage: "user Delete!" });  // muestro el usuario eliminado


}; */

export default { registerUser, listUserAdmin, login, deleteUser, listUser, updateUserAdmin };
