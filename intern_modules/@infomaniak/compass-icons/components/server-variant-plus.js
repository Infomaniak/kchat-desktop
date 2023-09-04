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
const ServerVariantPlusIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M17,16.5h-3v2h3v3h2v-3h3v-2h-3v-3h-2V16.5z M6,18v-1h2v1H6z M10,17h2v1h-2V17z M6,6h2v1H6V6z M10,6h5v1h-5V6z M14,22H4\nc-1.1,0-2-0.9-2-2v-5c0-1.1,0.9-2,2-2h10c-0.6,0.6-1.1,1.2-1.5,2H4v5h8.6C12.9,20.8,13.4,21.4,14,22z M4,11h16c1.1,0,2-0.9,2-2V4\n\tc0-1.1-0.9-2-2-2H4C2.9,2,2,2.9,2,4v5C2,10.1,2.9,11,4,11z M4,4h16v5H4V4z" })));
};
exports.default = ServerVariantPlusIcon;
