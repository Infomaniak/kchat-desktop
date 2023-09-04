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
const FileMultipleOutlineLargeIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M19.016,1h-8.051c-0.397,0-0.771,0.154-1.054,0.432l-4.449,4.39l0,0C5.179,6.103,5.016,6.492,5.016,6.89V19c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V3C21.016,1.897,20.119,1,19.016,1z M10.016,2.734V6.5H6.2L10.016,2.734z M20.016,19\n\tc0,0.551-0.449,1-1,1h-12c-0.552,0-1-0.449-1-1V7.5h4c0.552,0,1-0.448,1-1V2h8c0.551,0,1,0.448,1,1V19z M18.722,22\n\tc-0.347,0.595-0.985,1-1.722,1H6.246C4.453,23,3,21.547,3,19.754V8.89c0-0.402,1-1.615,1-1.615v12.229C4,20.877,5.123,22,6.496,22\n\tH18.722z" })));
};
exports.default = FileMultipleOutlineLargeIcon;
