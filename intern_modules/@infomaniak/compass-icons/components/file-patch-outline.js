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
const FilePatchOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M6,2C4.895,2,4,2.895,4,4v16c0,1.105,0.895,2,2,2h12c1.105,0,2-0.895,2-2V8l-6-6H6 M6,4h7v5h5v11H6V4 M16,11.5l-1-1c-0.787-0.787-2.214-0.787-3,0l-4,4c-0.787,0.786-0.787,2.214,0,3l1,1c0.393,0.394,0.901,0.65,1.47,0.65s1.137-0.257,1.53-0.65l4-4\n\tC16.787,13.714,16.787,12.287,16,11.5z M10.5,18l-2-2l1.5-1.5l2,2L10.5,18z M15.5,13L14,14.5l-2-2l1.5-1.5L15.5,13z" })));
};
exports.default = FilePatchOutlineIcon;
