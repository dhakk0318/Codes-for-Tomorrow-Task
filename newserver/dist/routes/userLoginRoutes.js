"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userLogin_1 = require("../controllers/userLogin");
const router = express_1.default.Router();
router.post("/register", userLogin_1.register);
router.post("/login", userLogin_1.login);
router.post("/logout", userLogin_1.logout);
exports.default = router;
//# sourceMappingURL=userLoginRoutes.js.map