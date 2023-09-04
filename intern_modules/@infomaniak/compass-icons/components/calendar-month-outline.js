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
const CalendarMonthOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M6,11h2v2H6V11 M22,5v14c0,1.105-0.895,2-2,2H4c-1.105,0-2-0.895-2-2V5c0-1.105,0.895-2,2-2h16C21.105,3,22,3.895,22,5 M4,7h16V5H4V7 M20,19V9H4v10H20 M16,13v-2h2v2H16 M11,13v-2h2v2H11 M6,15h2v2H6V15 M16,17v-2h2v2H16 M11,17v-2h2v2H11z" })));
};
exports.default = CalendarMonthOutlineIcon;
