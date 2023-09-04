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
const LeafOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M5.8,18.7c2.8,2.3,7.4,2.6,10.4-0.4c1.5-1.5,2.8-4.2,3.6-6.9c0.9-2.7,1.5-5.5,1.6-7.3c0.1-1.1-1-1.6-1.8-1.2\nc-0.8,0.4-1.9,0.7-3.1,0.9c-0.6,0.1-1.3,0.2-1.9,0.4l0,0c-0.7,0.1-1.3,0.2-2,0.4C9.8,5,6.8,5.8,4.8,7.8c-2.8,2.8-2.3,6.6-0.5,9.3\n\tC4.2,17.4,4,17.7,3.9,18c-0.3,0.7-0.5,1.2-0.6,1.6C3.2,19.8,3.1,20,3,20.2c-0.2,0.5,0.2,1.1,0.7,1.2c0.5,0.2,1.1-0.2,1.2-0.7l0,0\n\tl0,0c0,0,0-0.1,0-0.1c0-0.1,0.1-0.2,0.1-0.4c0.1-0.4,0.3-0.9,0.6-1.5C5.7,18.7,5.8,18.7,5.8,18.7z M17.9,10.7\n\tc-0.9,2.6-2,4.9-3.1,6.1c-2.4,2.4-6.1,2-8.1,0c0.4-0.7,0.9-1.5,1.5-2.2c1.1-1.4,2.9-2.7,4.5-3.7c0.8-0.5,1.4-0.9,1.9-1.2\n\tc0.2-0.1,0.4-0.2,0.6-0.3c0.1,0,0.1-0.1,0.2-0.1l0,0l0,0l0,0c0.5-0.2,0.7-0.8,0.4-1.3c-0.2-0.5-0.8-0.7-1.3-0.4\n\tc-0.3,0.1-0.6,0.3-0.9,0.5c-0.5,0.3-1.2,0.7-2,1.2c-1.6,1-3.6,2.5-4.9,4.1c-0.5,0.6-0.9,1.2-1.3,1.7c-1-1.9-0.9-4.2,0.7-5.9\n\tc1.5-1.5,4-2.2,6.7-2.8c0.7-0.1,1.3-0.3,2-0.4l0,0c0.7-0.1,1.3-0.2,2-0.4c0.8-0.2,1.6-0.4,2.4-0.6C19.1,6.7,18.6,8.7,17.9,10.7z" })));
};
exports.default = LeafOutlineIcon;
