"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const StarIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M12,17.612l5.57,3.361c0.407,0.245,0.907-0.119,0.799-0.58l-1.478-6.335l4.924-4.264c0.358-0.311,0.167-0.898-0.305-0.939l-6.482-0.559l-2.533-5.969c-0.185-0.436-0.801-0.436-0.987,0L8.973,8.294L2.49,8.854C2.019,8.895,1.828,9.482,2.186,9.792\n\tl4.914,4.265L5.63,20.395c-0.107,0.462,0.394,0.825,0.799,0.579L12,17.612z" })));
};
exports.default = StarIcon;
