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
const RobotHappyIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M20,10.7h0.7c0.7,0,1.3,0.6,1.3,1.3v2.7c0,0.7-0.6,1.3-1.3,1.3H20V10.7z M3.3,10.7H4V16H3.3C2.6,16,2,15.4,2,14.7V12C2,11.3,2.6,10.7,3.3,10.7z M14.7,13.3c0.7,0,1.3-0.6,1.3-1.3s-0.6-1.3-1.3-1.3s-1.3,0.6-1.3,1.3S13.9,13.3,14.7,13.3z M9.3,13.3\n\tc0.7,0,1.3-0.6,1.3-1.3s-0.5-1.3-1.3-1.3S8,11.3,8,12S8.6,13.3,9.3,13.3z M8,15.1c0,0.1,0,0.2,0,0.2c0,1.5,1.8,2.7,4,2.7\n\ts4-1.2,4-2.7c0-0.1,0-0.2,0-0.2c-1,0.5-2.4,0.9-4,0.9S9,15.7,8,15.1z M10.7,6.7V5.3C10.7,4.6,11.3,4,12,4s1.3,0.6,1.3,1.3v1.3H16\n\tc1.5,0,2.7,1.2,2.7,2.7v8c0,1.5-1.2,2.7-2.7,2.7H8c-1.5,0-2.7-1.2-2.7-2.7v-8c0-1.5,1.2-2.7,2.7-2.7h2.7V6.7z" })));
};
exports.default = RobotHappyIcon;
