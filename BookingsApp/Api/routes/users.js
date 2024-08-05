import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/*
router.get("/checkauthentication", verifyToken, (req,res,next)=> { 
    res.send("user logged in")
})

router.get("/checkuser/:id", verifyUser, (req,res,next)=> { 
    res.send("user logged in and can delete account.")
})

router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=> { 
    res.send("Admin logged in and can delete all account.")
})*/


//Update
router.put("/:id",verifyUser, updateUser);

//Delete
router.delete("/:id",verifyUser, deleteUser);

//Get
router.get("/:id", verifyUser,getUser);

//GetAll
router.get("/", verifyAdmin,getUsers);

export default router;