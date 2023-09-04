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
const SearchListIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M3,7V5h18v2H3z M8.4,17H3v2h6.5C9,18.4,8.7,17.7,8.4,17z M8.9,11H3v2h5.2C8.3,12.3,8.5,11.6,8.9,11z M21.6,19.2L20,17.6c1.5-2.1,1.3-5.1-0.6-7c-2.1-2.1-5.6-2.1-7.8,0s-2.1,5.6,0,7.8c1.9,1.9,4.9,2.1,7,0.6l1.7,1.7c0.4,0.4,1,0.4,1.4,0\n\tC22.1,20.3,22.1,19.7,21.6,19.2z M13,17c-1.4-1.4-1.4-3.6,0-4.9c1.4-1.4,3.6-1.4,4.9,0c1.4,1.4,1.4,3.6,0,4.9S14.4,18.3,13,17z" })));
};
exports.default = SearchListIcon;
