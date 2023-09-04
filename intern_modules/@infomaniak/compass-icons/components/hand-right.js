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
const HandRightIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M21,6.58V18.67A3.33,3.33 0 0,1 17.67,22H11.58C10.68,22 9.83,21.64 9.21,21L2.67,14.36C2.67,14.36 3.72,13.33 3.75,13.32C3.93,13.16 4.16,13.07 4.41,13.07C4.59,13.07 4.76,13.12 4.91,13.21C4.94,13.22 8.5,15.26 8.5,15.26V5.33A1.25,1.25 0 0,1 9.75,4.08A1.25,1.25 0 0,1 11,5.33V11.17H11.83V3.25A1.25,1.25 0 0,1 13.08,2C13.78,2 14.33,2.56 14.33,3.25V11.17H15.17V4.08C15.17,3.39 15.72,2.83 16.42,2.83A1.25,1.25 0 0,1 17.67,4.08V11.17H18.5V6.58A1.25,1.25 0 0,1 19.75,5.33A1.25,1.25 0 0,1 21,6.58Z" })));
};
exports.default = HandRightIcon;
