"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCropType = exports.getCropTypeById = exports.deleteCropType = exports.updateCropType = exports.addCropType = void 0;
var http_status_codes_1 = require("http-status-codes");
var CropType_1 = __importDefault(require("../../models/common/CropType"));
var bad_request_1 = __importDefault(require("../../errors/bad-request"));
var not_found_1 = __importDefault(require("../../errors/not-found"));
// Add Crop Type 
var addCropType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, imageUrl, cropType;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, imageUrl = _a.imageUrl;
                if (!name || !name.eng || !name.hin || !name.guj) {
                    throw new bad_request_1.default("Please provide the name of the crop type in all required languages.");
                }
                return [4 /*yield*/, CropType_1.default.create({ name: name, imageUrl: imageUrl })];
            case 1:
                cropType = _b.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    success: true,
                    message: "Crop type added successfully.",
                    data: cropType,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.addCropType = addCropType;
// Update Crop Type
var updateCropType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, name, imageUrl, cropType;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, name = _a.name, imageUrl = _a.imageUrl;
                if (!id) {
                    throw new bad_request_1.default("Please provide the ID of the crop type.");
                }
                if (!name || !name.eng || !name.hin || !name.guj) {
                    throw new bad_request_1.default("Please provide the name of the crop type in all required languages.");
                }
                return [4 /*yield*/, CropType_1.default.findByIdAndUpdate(id, { name: name, imageUrl: imageUrl }, { new: true, runValidators: true })];
            case 1:
                cropType = _b.sent();
                if (!cropType) {
                    throw new not_found_1.default("Crop type not found.");
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Crop type updated successfully.",
                    data: cropType,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updateCropType = updateCropType;
// Delete Crop Type (Soft Delete)
var deleteCropType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, cropType;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                if (!id) {
                    throw new bad_request_1.default("Please provide the ID of the crop type.");
                }
                return [4 /*yield*/, CropType_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true })];
            case 1:
                cropType = _a.sent();
                if (!cropType) {
                    throw new not_found_1.default("Crop type not found.");
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Crop type deleted successfully.",
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteCropType = deleteCropType;
// Get Crop Type by ID
var getCropTypeById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, cropType;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                if (!id) {
                    throw new bad_request_1.default("Please provide the ID of the crop type.");
                }
                return [4 /*yield*/, CropType_1.default.findById(id)];
            case 1:
                cropType = _a.sent();
                if (!cropType || cropType.isDeleted) {
                    throw new not_found_1.default("Crop type not found.");
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    data: cropType,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getCropTypeById = getCropTypeById;
// Get All Crop Types
var getAllCropType = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cropTypes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CropType_1.default.find({ isDeleted: false })];
            case 1:
                cropTypes = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    data: cropTypes,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllCropType = getAllCropType;
