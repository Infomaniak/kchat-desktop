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
const FilePatchOutlineLargeIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M18,2H9.949C9.552,2,9.178,2.154,8.895,2.432l-4.449,4.39l0,0C4.163,7.103,4,7.492,4,7.89V20c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C20,2.897,19.103,2,18,2z M9,3.734V7.5H5.184L9,3.734z M19,20c0,0.551-0.449,1-1,1H6c-0.552,0-1-0.449-1-1\n\tV8.5h4c0.552,0,1-0.448,1-1V3h8c0.551,0,1,0.448,1,1V20z M14.207,10.207c-0.391-0.391-1.024-0.391-1.414,0l-4.95,4.95\n\tc-0.391,0.391-0.391,1.024,0,1.414l2.121,2.121c0.391,0.39,1.024,0.39,1.414,0l4.95-4.95c0.391-0.391,0.391-1.024,0-1.414\n\tL14.207,10.207z M11.644,13.124c0.195-0.195,0.512-0.195,0.707,0s0.195,0.512,0,0.707s-0.512,0.195-0.707,0\n\tS11.449,13.319,11.644,13.124z M10.76,14.008c0.195-0.195,0.512-0.195,0.707,0s0.195,0.512,0,0.707s-0.512,0.195-0.707,0\n\tS10.565,14.203,10.76,14.008z M10.672,17.985L8.55,15.864l1.414-1.414l2.121,2.121L10.672,17.985z M12.528,15.776\n\tc-0.195,0.195-0.512,0.195-0.707,0s-0.195-0.512,0-0.707s0.512-0.195,0.707,0S12.723,15.58,12.528,15.776z M13.412,14.892\n\tc-0.195,0.195-0.512,0.195-0.707,0s-0.195-0.512,0-0.707s0.512-0.195,0.707,0C13.607,14.38,13.607,14.696,13.412,14.892z\n\t M14.207,14.45l-2.121-2.121l1.414-1.415l2.121,2.121L14.207,14.45z" })));
};
exports.default = FilePatchOutlineLargeIcon;
