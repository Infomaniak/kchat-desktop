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
const StarOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M12.001,5.642l1.416,3.337l0.411,0.969l1.049,0.091l3.62,0.312l-2.753,2.384l-0.799,0.692l0.24,1.029l0.824,3.533l-3.107-1.875L12,15.568l-0.904,0.546l-3.112,1.879l0.821-3.54l0.238-1.026l-0.796-0.691l-2.748-2.385l3.625-0.313l1.049-0.09\n\tl0.411-0.969L12.001,5.642 M12.001,2c-0.2,0-0.401,0.109-0.494,0.327L8.973,8.294L2.49,8.854C2.019,8.895,1.828,9.482,2.185,9.792\n\tl4.914,4.265L5.63,20.395c-0.083,0.359,0.201,0.659,0.522,0.659c0.092,0,0.187-0.025,0.277-0.079L12,17.612l5.57,3.361\n\tc0.09,0.054,0.185,0.079,0.277,0.079c0.322,0,0.606-0.3,0.522-0.659l-1.478-6.335l4.924-4.264c0.358-0.311,0.167-0.898-0.305-0.939\n\tl-6.482-0.559l-2.533-5.969C12.402,2.109,12.202,2,12.001,2L12.001,2z" })));
};
exports.default = StarOutlineIcon;
