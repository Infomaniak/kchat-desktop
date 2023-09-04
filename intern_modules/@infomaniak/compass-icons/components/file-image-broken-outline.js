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
const FileImageBrokenOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M17,16.5l-1.969-1.969c-0.292-0.292-0.77-0.292-1.062,0L12,16.5l-1.967-1.967c-0.293-0.293-0.773-0.293-1.067,0L7,16.5l-3-3V20c0,1.105,0.895,2,2,2h12c1.105,0,2-0.895,2-2v-4.793V15.04V13.5L17,16.5z M18,20H6v-2.5l0.47,0.47\n\tc0.291,0.291,0.768,0.291,1.059,0L9.5,16l1.973,1.973c0.29,0.29,0.765,0.29,1.055,0L14.5,16l1.973,1.973\n\tc0.291,0.291,0.763,0.291,1.054,0L18,17.5V20z M14,2H6C4.895,2,4,2.895,4,4v7.5l2.469,2.469c0.292,0.292,0.769,0.292,1.061,0L9.5,12\n\tl1.97,1.97c0.292,0.292,0.769,0.292,1.061,0L14.5,12l1.97,1.97c0.291,0.291,0.768,0.291,1.059,0L20,11.5V8L14,2z M17,12.5l-2-2\n\tc-0.275-0.275-0.725-0.275-1,0l-2,2l-1.97-1.97c-0.292-0.292-0.769-0.292-1.06,0L7,12.5l-1-1V4h7v5h5v2.5L17,12.5z" })));
};
exports.default = FileImageBrokenOutlineIcon;
