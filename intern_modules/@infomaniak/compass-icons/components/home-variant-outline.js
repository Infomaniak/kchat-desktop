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
const HomeVariantOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M18,19v-9l-6-4.5L6,10v9H18z M4,20V9.5c0-0.315,0.148-0.611,0.4-0.8l7-5.25c0.356-0.267,0.844-0.267,1.2,0l7,5.25C19.852,8.889,20,9.185,20,9.5V20c0,0.552-0.448,1-1,1H5C4.448,21,4,20.552,4,20z M13.25,14h-2.5C10.336,14,10,14.336,10,14.75V19h4\n\tv-4.25C14,14.336,13.664,14,13.25,14z" })));
};
exports.default = HomeVariantOutlineIcon;
