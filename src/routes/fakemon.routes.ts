import express, { Router } from "express";
import { getAllFakemon } from "../services/fakemon.service";
const router: Router = express.Router();

/* 
    @GET /fakemons Get All Fakemon 
*/
router.get("/", getAllFakemon);

export default router;
