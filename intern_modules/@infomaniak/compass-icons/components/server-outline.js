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
const ServerOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M19,3H5C3.9,3,3,3.9,3,5v3v7v3c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-3V8V5C21,3.9,20.1,3,19,3z M5,10h14v3H5V10z M19,18H5v-3h14V18z M5,8V5h14v3H5z M11,7H7V6h4V7z M15,7h-2V6h2V7z M11,12H7v-1h4V12z M15,12h-2v-1h2V12z M11,17H7v-1h4V17z M15,17h-2v-1h2\n\tV17z" })));
};
exports.default = ServerOutlineIcon;
