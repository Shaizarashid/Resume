import express from "express";
import Hotel  from "../models/Hotels.js"
import { createError } from "../utils/error.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create 
router.post("/",verifyAdmin,createHotel);

//Update
router.put("/:id",verifyAdmin, updateHotel);

//Delete
router.delete("/:id",verifyAdmin, deleteHotel);

//Get
router.get("/find/:id", getHotel);

//GetAll
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms)

export default router;