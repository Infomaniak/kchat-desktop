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
const AlertOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M21.638,16.575L14.64,3.578C14.117,2.605,13.105,2,12,2S9.883,2.605,9.359,3.578L2.362,16.575c-0.505,0.939-0.481,2.046,0.065,2.962C2.974,20.453,3.937,21,5.003,21h13.994c1.066,0,2.029-0.547,2.575-1.463\n\tC22.119,18.622,22.143,17.514,21.638,16.575z M18.995,18.998H5.001c-0.757,0-1.239-0.808-0.88-1.475l6.997-12.997\n\tC11.307,4.175,11.652,4,11.998,4s0.691,0.175,0.88,0.526l6.997,12.997C20.234,18.19,19.752,18.998,18.995,18.998z M12.5,13h-1L11,7\n\th2L12.5,13z M12.999,16c0,0.552-0.448,1-1,1s-1-0.448-1-1s0.448-1,1-1C12.552,15,12.999,15.448,12.999,16z" })));
};
exports.default = AlertOutlineIcon;
