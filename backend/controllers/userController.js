import user from "../models/user.js";
import rol from "../models/role.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send({ menssage: "Incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10);

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
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ mensagge: "Register error" });
  }
};

const listUser = async (req, res) => {
  let users = await user.find().populate("role").exec(); // populate me muestra todo el sub-json, el find solo me trae el json user, exec es para ejecutar el populate
  if (users.length === 0)
    return res.status(400).send({ mensagge: "No se encontraron resultados" });

  return res.status(200).send({ users });
};

const listRol = async (req, res) => {
  let roles = await rol.find();

  if (roles.length === 0)
    return res.status(400).send({ mensagge: "No se encontraron resultados" });

  return res.status(200).send({ roles });
};

export default { registerUser, listUser, listRol };
