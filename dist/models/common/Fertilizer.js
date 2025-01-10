"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var FertilizerSchema = new mongoose_1.default.Schema({
    name: {
        eng: {
            type: String,
            required: [true, "English name is required"],
        },
        hin: {
            type: String,
            required: [true, "Hindi name is required"],
        },
        guj: {
            type: String,
            required: [true, "Gujarati name is required"],
        }
    },
    imageUrl: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        enum: ["Kg", "lit"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Fertilizer", FertilizerSchema);
