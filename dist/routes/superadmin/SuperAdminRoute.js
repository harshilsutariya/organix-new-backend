"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var SuperAdminConroller_1 = require("../../controllers/superadmin/SuperAdminConroller");
router.post("/signUp", SuperAdminConroller_1.signUp);
exports.default = router;
