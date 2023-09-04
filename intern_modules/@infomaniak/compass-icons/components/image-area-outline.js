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
const ImageAreaOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M20,19H4V5h16 M20,3H4C2.895,3,2,3.895,2,5v14c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V5C22,3.895,21.105,3,20,3 M14.072,11.702l-2.686,3.337c-0.212,0.264-0.619,0.27-0.84,0.013l-1.66-1.929c-0.221-0.257-0.627-0.25-0.84,0.013l-2.428,3.007\n\tC5.337,16.49,5.59,17,6.043,17h11.915c0.448,0,0.702-0.501,0.431-0.849l-3.46-4.442C14.714,11.433,14.291,11.43,14.072,11.702z\n\t M10,9.5c0,0.828-0.672,1.5-1.5,1.5S7,10.328,7,9.5S7.672,8,8.5,8S10,8.672,10,9.5z" })));
};
exports.default = ImageAreaOutlineIcon;
