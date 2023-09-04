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
const EmoticonPlusOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M14.5,12c0.8,0,1.5-0.7,1.5-1.5S15.3,9,14.5,9S13,9.7,13,10.5S13.7,12,14.5,12 M8.5,12c0.8,0,1.5-0.7,1.5-1.5S9.3,9,8.5,9S7,9.7,7,10.5S7.7,12,8.5,12 M18.97,11.915C18.985,12.108,19,12.302,19,12.5c0,4.135-3.365,7.5-7.5,7.5S4,16.635,4,12.5\n\tS7.365,5,11.5,5c0.198,0,0.392,0.015,0.585,0.03c0.113-0.693,0.339-1.346,0.668-1.938C12.342,3.038,11.926,3,11.5,3\n\tC6.253,3,2,7.253,2,12.5S6.253,22,11.5,22s9.5-4.253,9.5-9.5c0-0.426-0.038-0.842-0.092-1.253\n\tC20.317,11.575,19.663,11.802,18.97,11.915z M17,2h2v3h3v2h-3v3h-2V7h-3V5h3V2z M6.381,14.5c0.8,2.047,2.788,3.5,5.119,3.5\n\ts4.319-1.453,5.119-3.5H6.381z" })));
};
exports.default = EmoticonPlusOutlineIcon;
