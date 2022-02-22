import express from "express"
import taskController from "../controllers/taskController.js"


const router = express.Router();


router.post("/registerTask", taskController.registerTask)
router.delete("/deleteTask/:_id?",taskController.deleteTask)
router.put("/updateTask",taskController.updateTask)
router.get("/listTask/:name?",taskController.listTask)

export default router