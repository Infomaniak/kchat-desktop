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
const MagnifyIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M20.224,18.829l-3.775-3.775C17.418,13.791,18,12.215,18,10.5C18,6.358,14.642,3,10.5,3S3,6.358,3,10.5S6.358,18,10.5,18c1.708,0,3.278-0.578,4.539-1.539l3.775,3.749c0.39,0.388,1.02,0.388,1.41,0C20.592,19.823,20.592,19.216,20.224,18.829z M5,10.5\n\tC5,7.462,7.462,5,10.5,5S16,7.462,16,10.5S13.538,16,10.5,16S5,13.538,5,10.5z" })));
};
exports.default = MagnifyIcon;
