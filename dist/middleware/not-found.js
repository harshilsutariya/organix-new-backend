"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notFound = function (_e, _, res, _next) {
    res.status(404).send("Route does not exist");
};
exports.default = notFound;
