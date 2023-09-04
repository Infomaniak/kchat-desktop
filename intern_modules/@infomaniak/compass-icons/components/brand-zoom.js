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
const BrandZoomIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M14.7,14.1c0,0.5,0,0.7-0.1,0.9s-0.2,0.3-0.4,0.4c-0.2,0.1-0.4,0.1-0.9,0.1h-4c-1.2,0-1.8,0-2.2-0.2c-0.4-0.2-0.7-0.5-0.9-0.9C6,13.9,6,13.4,6,12.2V9.9c0-0.5,0-0.7,0.1-0.8\n\tc0.1-0.2,0.2-0.3,0.4-0.4c0.2-0.1,0.4-0.1,0.8-0.1h4.1c1.2,0,1.8,0,2.2,0.2C14,9,14.3,9.3,14.5,9.7c0.2,0.5,0.2,1,0.2,2.2V14.1z\n\t M18.1,14.4c0,0.4,0,0.5,0,0.6c-0.1,0.2-0.3,0.3-0.6,0.3c-0.1,0-0.2-0.1-0.5-0.4L15.8,14c-0.2-0.2-0.3-0.2-0.3-0.3\n\tc-0.1-0.2-0.2-0.4-0.3-0.6c0-0.1,0-0.2,0-0.5v-1.2c0-0.2,0-0.4,0-0.5c0-0.2,0.1-0.4,0.3-0.6c0.1-0.1,0.2-0.2,0.3-0.3L17,9.1\n\tc0.3-0.2,0.4-0.3,0.5-0.4C17.7,8.6,18,8.8,18.1,9c0,0.1,0,0.3,0,0.6V14.4z" })));
};
exports.default = BrandZoomIcon;
