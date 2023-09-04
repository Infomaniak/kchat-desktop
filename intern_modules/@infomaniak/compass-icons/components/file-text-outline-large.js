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
const FileTextOutlineLargeIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M18,2H9.949C9.552,2,9.178,2.154,8.895,2.432l-4.449,4.39l0,0C4.163,7.103,4,7.492,4,7.89V20c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C20,2.897,19.103,2,18,2z M9,3.734V7.5H5.184L9,3.734z M19,20c0,0.551-0.449,1-1,1H6c-0.552,0-1-0.449-1-1\n\tV8.5h4c0.552,0,1-0.448,1-1V3h8c0.551,0,1,0.448,1,1V20z M15.5,11h-7C8.224,11,8,11.224,8,11.5S8.224,12,8.5,12h7\n\tc0.276,0,0.5-0.224,0.5-0.5S15.776,11,15.5,11z M15.5,13h-7C8.224,13,8,13.224,8,13.5S8.224,14,8.5,14h7c0.276,0,0.5-0.224,0.5-0.5\n\tS15.776,13,15.5,13z M15.5,15h-7C8.224,15,8,15.224,8,15.5S8.224,16,8.5,16h7c0.276,0,0.5-0.224,0.5-0.5S15.776,15,15.5,15z\n\t M13.5,17h-5C8.224,17,8,17.224,8,17.5S8.224,18,8.5,18h5c0.276,0,0.5-0.224,0.5-0.5S13.776,17,13.5,17z" })));
};
exports.default = FileTextOutlineLargeIcon;
