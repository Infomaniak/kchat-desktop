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
const FileImageOutlineLargeIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M18,2H9.949C9.552,2,9.178,2.154,8.895,2.432l-4.449,4.39l0,0C4.163,7.103,4,7.492,4,7.89V20c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C20,2.897,19.103,2,18,2z M9,3.734V7.5H5.184L9,3.734z M19,20c0,0.551-0.449,1-1,1H6c-0.552,0-1-0.449-1-1\n\tV8.5h4c0.552,0,1-0.448,1-1V3h8c0.551,0,1,0.448,1,1V20z M9.5,14c0.827,0,1.5-0.673,1.5-1.5S10.327,11,9.5,11S8,11.673,8,12.5\n\tS8.673,14,9.5,14z M9.5,12c0.276,0,0.5,0.224,0.5,0.5S9.776,13,9.5,13S9,12.776,9,12.5S9.224,12,9.5,12z M13.963,12.947\n\tc-0.099-0.192-0.286-0.318-0.501-0.336c-0.214-0.018-0.421,0.072-0.552,0.244l-1.59,2.094L10.67,14.5\n\tc-0.281-0.193-0.659-0.13-0.861,0.148l-2.07,2.86c-0.139,0.191-0.158,0.44-0.051,0.651c0.107,0.21,0.321,0.341,0.557,0.341h7.55\n\tc0.22,0,0.42-0.112,0.534-0.3s0.122-0.417,0.022-0.61L13.963,12.947z M8.979,17.5l1.425-1.969l0.708,0.489\n\tc0.239,0.166,0.563,0.114,0.738-0.117l1.497-1.97l1.834,3.566L8.979,17.5L8.979,17.5z" })));
};
exports.default = FileImageOutlineLargeIcon;
