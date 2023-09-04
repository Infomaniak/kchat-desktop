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
const SoccerIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,3C13.76,3 15.4,3.53 16.78,4.41L16.5,5H13L12,5L10.28,4.16L10.63,3.13C11.08,3.05 11.53,3 12,3M9.53,3.38L9.19,4.41L6.63,5.69L5.38,5.94C6.5,4.73 7.92,3.84 9.53,3.38M13,6H16L18.69,9.59L17.44,12.16L14.81,12.78L11.53,8.94L13,6M6.16,6.66L7,10L5.78,13.06L3.22,13.94C3.08,13.31 3,12.67 3,12C3,10.1 3.59,8.36 4.59,6.91L6.16,6.66M20.56,9.22C20.85,10.09 21,11.03 21,12C21,13.44 20.63,14.79 20.03,16H19L18.16,12.66L19.66,9.66L20.56,9.22M8,10H11L13.81,13.28L12,16L8.84,16.78L6.53,13.69L8,10M12,17L15,19L14.13,20.72C13.44,20.88 12.73,21 12,21C10.25,21 8.63,20.5 7.25,19.63L8.41,17.91L12,17M19,17H19.5C18.5,18.5 17,19.67 15.31,20.34L16,19L19,17Z" })));
};
exports.default = SoccerIcon;
