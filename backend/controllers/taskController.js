import task from "../models/task.js";
import user from "../models/user.js";


const registerTask = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ menssage: "Incomplete Data" });

  const taskId = await user.findOne({ name: req.body.user });
  if (!taskId) return res.status(400).send({ menssage: "Unregistered user" });

  req.body.user = taskId._id;

  const taskSchema = new task({
    user: req.body.user,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "To-do",
    imgeUrl: "",
  });

  const result = await taskSchema.save();

  return !result
    ? res.status(400).send({ Message: "Error Register Task" })
    : res.status(200).send({ result });
};

const deleteTask = async (req,res) => {
    if (!req.params["_id"])
    return res.status(400).send({ menssage: "Incomplete Data" });

  const deltask = await task.findByIdAndDelete(req.params["_id"]);

  return !deltask
    ? res.status(400).send({ menssage: "Error delete Task" })
    : res.status(200).send({menssage: "Task Delete!" });  //
}

const updateTask = async (req,res)=>{
    if (!req.body._id || !req.body.name)
    return res.status(400).send({ menssage: "Incomplete Data" });

  const editTask = await task.findByIdAndUpdate(req.body._id, {
    taskStatus: req.body.taskStatus,
  });
  if (!editTask)
    return res.status(500).send({ menssage: "error editing Task" });
  return res.status(200).send({ menssage: "Task Update" });
}

const listTask = async (req,res)=>{
    let users = await task
    .find({ name: new RegExp(req.params["name"]) })
    .populate("user")
    .exec();

  return users.length === 0
    ? res.status(400).send({ menssage: "No se encontraron resultados" })
    : res.status(200).send({ users });
}


export default { registerTask, deleteTask, updateTask, listTask };
