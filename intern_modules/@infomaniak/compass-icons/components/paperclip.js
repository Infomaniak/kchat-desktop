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
const PaperclipIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M16.5,7v9.5c0,2.209-1.791,4-4,4s-4-1.791-4-4V6c0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5v9.5c0,0.552-0.448,1-1,1s-1-0.448-1-1V7H10v8.5c0,1.381,1.119,2.5,2.5,2.5s2.5-1.119,2.5-2.5V6c0-2.209-1.791-4-4-4S7,3.791,7,6v10.5\n\tc0,3.038,2.462,5.5,5.5,5.5s5.5-2.462,5.5-5.5V7H16.5z" })));
};
exports.default = PaperclipIcon;
