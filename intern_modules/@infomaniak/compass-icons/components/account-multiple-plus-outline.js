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
const AccountMultiplePlusOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M4.3,18.1c0.1,0,0.2-0.1,0.3-0.1l3.1-1.9c0.7,0.4,1.4,0.6,2.3,0.6s1.6-0.2,2.3-0.6l0.01,0.006c0.428-1.286,1.277-2.379,2.387-3.113C15.134,11.911,15.4,10.713,15.4,9.5C15.4,6.2,13.2,4,10,4S4.6,6.2,4.6,9.5\n\tc0,1.9,0.6,3.8,1.6,5.2l-2.5,1.5c-1,0.5-1.7,1.6-1.7,2.7C2,20.6,3.4,22,5,22h8.537c-0.518-0.577-0.924-1.254-1.188-2H5\n\tc-0.6,0-1-0.5-1-1.1c0-0.1,0-0.2,0-0.3C4.1,18.4,4.2,18.2,4.3,18.1z M10,6c1.9,0,3.4,1.1,3.4,3.5c0,1.5-0.5,3.1-1.4,4.2\n\tc-0.5,0.7-1.2,1.1-2.1,1.1c-0.9,0-1.5-0.4-2.1-1.1C7.1,12.6,6.6,11,6.6,9.5C6.6,7.1,8.1,6,10,6z M17.4,8.4c0,0.4,0.1,0.7,0.1,1.1\n\tc0,0.884-0.101,1.734-0.284,2.557C17.473,12.023,17.734,12,18,12c0.383,0,0.757,0.04,1.121,0.108\n\tC19.293,11.239,19.4,10.369,19.4,9.5c0-0.4,0-3.1-1.9-5.5C16.7,3,15,2,14,2c-0.7,0-1.3,0.1-1.8,0.3c1.3,0.4,2.5,1.1,3.4,2\n\tC16.6,5.4,17.2,6.8,17.4,8.4z M19,17v-3h-2v3h-3v2h3v3h2v-3h3v-2H19z" })));
};
exports.default = AccountMultiplePlusOutlineIcon;
