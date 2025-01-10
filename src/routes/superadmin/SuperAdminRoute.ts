import express from "express";
const router = express.Router();
import {signUp} from "../../controllers/superadmin/SuperAdminConroller";


router.post("/signUp",signUp);

export default router;
