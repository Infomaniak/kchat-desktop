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
const PinIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M21.7,9.8l-1-1l-6.5-6.5l0,0c-0.4-0.4-1-0.4-1.4,0l0,0c-0.4,0.4-0.4,1,0,1.4L13.1,4L8.7,8.4c-1.7-0.2-3.4,0-5,0.7C3.3,9.2,3.1,9.5,3,9.8c0,0.3,0.1,0.7,0.3,0.9L7.6,15l-4.1,4l-1,2.5l2.5-1l4-4l4.2,4.3c0.2,0.2,0.6,0.3,0.9,0.3\n\tc0.3-0.1,0.6-0.3,0.7-0.6c0.6-1.6,0.9-3.3,0.7-5l4.5-4.6l0.3,0.3c0.4,0.4,1,0.4,1.4,0C22.1,10.8,22.1,10.2,21.7,9.8z" })));
};
exports.default = PinIcon;
