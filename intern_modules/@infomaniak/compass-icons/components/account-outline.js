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
const AccountOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M19.2,15.9L16,14c0.2-0.3,0.5-0.6,0.7-1c0.8-1.4,1.3-3.2,1.3-5c0-3.6-2.4-6-6-6S6,4.4,6,8c0,1.8,0.5,3.6,1.3,5.1c0.2,0.4,0.4,0.7,0.7,1L4.8,16C3.7,16.4,3,17.6,3,18.8C3,20.6,4.4,22,6.2,22h11.6c1.8,0,3.2-1.4,3.2-3.2\n\tC21,17.6,20.3,16.4,19.2,15.9z M8,8c0-2.8,1.8-4,4-4s4,1.2,4,4c0,1.8-0.6,3.8-1.8,5c-0.6,0.6-1.3,1-2.2,1s-1.6-0.4-2.2-1\n\tC8.6,11.8,8,9.8,8,8z M17.8,20H6.2C5.5,20,5,19.5,5,18.8c0-0.5,0.3-0.9,0.7-1.1l3.9-2.3c0.8,0.4,1.6,0.6,2.4,0.6s1.6-0.2,2.3-0.6\n\tl3.9,2.3c0.4,0.2,0.7,0.6,0.7,1.1C19,19.5,18.5,20,17.8,20z" })));
};
exports.default = AccountOutlineIcon;
