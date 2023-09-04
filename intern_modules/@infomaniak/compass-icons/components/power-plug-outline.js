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
const PowerPlugOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M18.203,12.161l2.828-2.828c0.391-0.391,0.391-1.024,0-1.414c-0.391-0.391-1.024-0.391-1.414,0l-2.828,2.828l-3.536-3.536l2.828-2.828c0.391-0.391,0.391-1.024,0-1.414c-0.391-0.391-1.024-0.391-1.414,0l-2.828,2.828L9.01,2.969\n\tc-0.391-0.391-1.024-0.391-1.414,0L7.59,2.975c-0.39,0.39-0.39,1.023,0,1.414l0.707,0.707L5.121,8.272\n\tc-2.692,2.692-2.903,6.918-0.646,9.859c-0.019,0.016-0.043,0.023-0.061,0.041l-2.121,2.121c-0.391,0.391-0.391,1.024,0,1.414\n\ts1.024,0.391,1.414,0l2.121-2.121c0.018-0.018,0.024-0.042,0.041-0.061c2.941,2.257,7.167,2.046,9.859-0.646l3.176-3.176\n\tl0.707,0.707c0.391,0.391,1.024,0.391,1.414,0l0.006-0.006c0.391-0.391,0.391-1.024,0-1.414L18.203,12.161z M14.314,17.464\n\tc-2.144,2.144-5.634,2.144-7.778,0s-2.144-5.634,0-7.778L9.712,6.51l7.778,7.778L14.314,17.464z" })));
};
exports.default = PowerPlugOutlineIcon;
