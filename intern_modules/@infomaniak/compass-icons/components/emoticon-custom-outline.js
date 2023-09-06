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
const EmoticonCustomOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M21,5.8c0-0.1,0-0.2,0-0.3c0-0.1,0-0.3,0-0.4l0.9-0.7c0,0,0-0.1,0-0.1l-0.7-1.2c0,0-0.1-0.1-0.1,0l-1,0.4c-0.2-0.1-0.4-0.3-0.6-0.3l-0.2-1.1c0,0,0-0.1-0.1-0.1h-1.3c0,0-0.1,0-0.1,0.1l-0.2,1.1c-0.2,0.1-0.4,0.2-0.6,0.3l-1-0.4\n\tc0,0-0.1,0-0.1,0l-0.7,1.2c0,0,0,0.1,0,0.1L16,5.2c0,0.1,0,0.3,0,0.4c0,0.1,0,0.2,0,0.3l-0.9,0.7c0,0,0,0.1,0,0.1l0.7,1.2\n\tc0,0,0.1,0.1,0.1,0l1-0.4c0.2,0.1,0.4,0.2,0.6,0.3l0.2,1.1c0,0,0,0.1,0.1,0.1h1.3c0,0,0.1,0,0.1-0.1l0.2-1.1\n\tc0.2-0.1,0.4-0.2,0.6-0.3l1,0.4c0,0,0.1,0,0.1,0l0.7-1.2c0,0,0-0.1,0-0.1L21,5.8z M18.5,6.5c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1\n\tc0.5,0,1,0.4,1,1C19.5,6.1,19.1,6.5,18.5,6.5z M13.4,11.5c-0.3-0.3-0.4-0.7-0.4-1.1c0-0.4,0.1-0.7,0.4-1C13.8,9.2,14.1,9,14.5,9\n\tc0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.5,0.6,0.5,1c0,0.4-0.2,0.8-0.5,1.1c-0.3,0.3-0.6,0.5-1.1,0.5C14.1,12,13.8,11.8,13.4,11.5z\n\t M8.5,12c-0.4,0-0.8-0.2-1.1-0.5C7.2,11.2,7,10.9,7,10.5c0-0.4,0.1-0.7,0.4-1C7.8,9.2,8.1,9,8.5,9c0.4,0,0.8,0.2,1.1,0.5\n\tc0.3,0.3,0.5,0.6,0.5,1c0,0.4-0.2,0.8-0.5,1.1C9.3,11.8,8.9,12,8.5,12z M20.9,11.3c0.1,0.5,0.1,1,0.1,1.2c0,1.7-0.4,3.3-1.3,4.8\n\tc-0.8,1.4-2,2.6-3.4,3.4c-1.5,0.9-3.1,1.3-4.8,1.3c-1.7,0-3.3-0.4-4.8-1.3c-1.4-0.8-2.6-2-3.4-3.4C2.4,15.8,2,14.2,2,12.5\n\tc0-1.7,0.4-3.3,1.3-4.8c0.8-1.4,2-2.6,3.4-3.4C8.2,3.4,9.8,3,11.5,3c0.3,0,0.7,0,1.2,0.1c-0.3,0.6-0.6,1.3-0.6,1.9\n\tc-0.3,0-0.5,0-0.6,0c-1.4,0-2.6,0.3-3.8,1C6.6,6.7,5.7,7.6,5,8.7c-0.7,1.2-1,2.4-1,3.8s0.3,2.6,1,3.8c0.7,1.1,1.6,2,2.7,2.7\n\tc1.2,0.7,2.4,1,3.8,1c1.4,0,2.6-0.3,3.8-1c1.1-0.7,2-1.6,2.7-2.7c0.7-1.2,1-2.4,1-3.8c0-0.1,0-0.3,0-0.6\n\tC19.6,11.8,20.3,11.6,20.9,11.3z M6.4,14.5h10.2c-0.4,1-1.1,1.9-2,2.5c-0.9,0.6-2,1-3.1,1c-1.2,0-2.2-0.3-3.1-1\n\tC7.5,16.4,6.8,15.5,6.4,14.5z" })));
};
exports.default = EmoticonCustomOutlineIcon;
