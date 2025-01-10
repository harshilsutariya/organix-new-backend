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
exports.getCropItemByCropTypeId = exports.getAllCropItems = exports.getCropItemById = exports.deleteCropItem = exports.updateCropItem = exports.addCropItem = void 0;
var http_status_codes_1 = require("http-status-codes");
var CropItem_1 = __importDefault(require("../../models/common/CropItem"));
var CropType_1 = __importDefault(require("../../models/common/CropType"));
var bad_request_1 = __importDefault(require("../../errors/bad-request"));
var not_found_1 = __importDefault(require("../../errors/not-found"));
function checkCropTypeExists(cropId) {
    return __awaiter(this, void 0, void 0, function () {
        var cropType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, CropType_1.default.findById(cropId)];
                case 1:
                    cropType = _a.sent();
                    if (!cropType) {
                        throw new not_found_1.default('CropType not found');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Add Crop Item
var addCropItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, imageUrl, cropId, cropItem;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, imageUrl = _a.imageUrl, cropId = _a.cropId;
                return [4 /*yield*/, checkCropTypeExists(cropId)];
            case 1:
                _b.sent();
                // Ensure all parts of the name are provided
                if (!name || !name.eng || !name.hin || !name.guj || !cropId) {
                    throw new bad_request_1.default('All language names and CropId are required');
                }
                cropItem = new CropItem_1.default({ name: name, imageUrl: imageUrl, cropId: cropId });
                return [4 /*yield*/, cropItem.save()];
            case 2:
                _b.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    success: true,
                    message: "Crop item added successfully",
                    data: cropItem
                });
                return [2 /*return*/];
        }
    });
}); };
exports.addCropItem = addCropItem;
// Update Crop Item
var updateCropItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, name, imageUrl, cropId, updatedCropItem;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, name = _a.name, imageUrl = _a.imageUrl, cropId = _a.cropId;
                return [4 /*yield*/, checkCropTypeExists(cropId)];
            case 1:
                _b.sent();
                if (!id) {
                    throw new bad_request_1.default("Please provide the ID of the crop item.");
                }
                return [4 /*yield*/, CropItem_1.default.findByIdAndUpdate(id, { name: name, imageUrl: imageUrl, cropId: cropId }, { new: true, runValidators: true })];
            case 2:
                updatedCropItem = _b.sent();
                if (!updatedCropItem) {
                    throw new not_found_1.default('Crop item not found');
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: "Crop item updated successfully",
                    data: updatedCropItem
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updateCropItem = updateCropItem;
// Delete Crop Item
var deleteCropItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedCropItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                return [4 /*yield*/, CropItem_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true })];
            case 1:
                deletedCropItem = _a.sent();
                if (!deletedCropItem) {
                    throw new not_found_1.default('Crop item not found');
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    message: 'Crop item deleted successfully'
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteCropItem = deleteCropItem;
// Get Crop Item by ID
var getCropItemById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, cropItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                return [4 /*yield*/, CropItem_1.default.findById(id)];
            case 1:
                cropItem = _a.sent();
                if (!cropItem || cropItem.isDeleted) {
                    throw new not_found_1.default('Crop item not found');
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    data: cropItem
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getCropItemById = getCropItemById;
// Get All Crop Items
var getAllCropItems = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cropItems;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CropItem_1.default.find({ isDeleted: false })];
            case 1:
                cropItems = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    data: cropItems
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllCropItems = getAllCropItems;
// Get Crop Item by CropId
var getCropItemByCropTypeId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cropId, cropItems;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cropId = req.body.cropId;
                return [4 /*yield*/, checkCropTypeExists(cropId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, CropItem_1.default.find({ cropId: cropId, isDeleted: false })];
            case 2:
                cropItems = _a.sent();
                if (!cropItems.length) {
                    throw new not_found_1.default('No crop items found for this cropId');
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: true,
                    data: cropItems
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getCropItemByCropTypeId = getCropItemByCropTypeId;
