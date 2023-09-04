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
const ReplyOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M8.5,8.1L8.5,8.1v2l1.9,0.1c2.7,0.1,4.9,1.2,6.7,3.3c-2.1-0.7-4.3-0.8-6.7-0.8h-2v2v0.7l-3.7-3.7L8.5,8.1 M10.3,4C10.2,4,10,4,9.8,4.1l-7.7,7.2C2,11.4,2,11.5,2,11.7c0,0.1,0,0.2,0.1,0.3l7.7,7.4c0.1,0.1,0.3,0.1,0.4,0.1c0.1-0.1,0.2-0.2,0.2-0.5\n\tv-4.4c4.7,0,8.3,0.5,10.8,5.1c0.1,0.1,0.2,0.2,0.3,0.2h0.1c0.2-0.1,0.3-0.3,0.2-0.5c0.1-0.3-0.3-3-2.1-5.8c-2.2-3.5-5.4-5.4-9.3-5.6\n\tV4.3C10.5,4.1,10.4,4,10.3,4L10.3,4z" })));
};
exports.default = ReplyOutlineIcon;
