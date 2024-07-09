import express from 'express'
const router = express.Router()
import {getAllUsers, getOneUser, createUser, loginUser, deleteOneUser, updateOneUser, userPage} from "../controllers/users.js"
import { validatorUser, authenticateToken } from '../validators/users.js'

router.get("/", getAllUsers)
router.post("/", validatorUser, createUser)
router.post("/login", loginUser )
router.get("/auth", authenticateToken, userPage)

router.get("/:id", getOneUser)
router.delete("/:id", deleteOneUser)
router.put("/:id", validatorUser, updateOneUser)

export default router
