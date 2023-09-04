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
const ServerVariantIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M8,7V6H6v1H8z M8,17H6v1h2V17z M15,6v1h-5V6H15z M15,17h-5v1h5V17z M22,4c0-1.1-0.9-2-2-2H4C2.9,2,2,2.9,2,4v5\nc0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4z M20,4v5H4V4H20z M22,15v5c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2v-5c0-1.1,0.9-2,2-2h16\n\tC21.1,13,22,13.9,22,15z M20,15H4v5h16V15z" })));
};
exports.default = ServerVariantIcon;
