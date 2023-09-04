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
const FireIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M11.8,6c0.1,0.1,0.2,0.3,0.3,0.4c0.4,0.6,1.1,1.3,2.1,2.2c0.8,0.7,1.4,1.3,1.7,1.7c0.5,0.6,0.9,1.2,1.2,1.8c0.3,0.7,0.4,1.6,0.4,2.4c0,1-0.2,1.9-0.7,2.7c-0.5,0.9-1.2,1.5-2,2C13.9,19.8,13,20,12,20s-1.9-0.2-2.7-0.7c-0.9-0.5-1.5-1.2-2-2\n\ts-0.7-1.7-0.7-2.7c0-0.9,0.2-1.7,0.6-2.5c0,0,0-0.1,0.1-0.1v1.4c0,1,0.4,1.9,1,2.5c0.7,0.7,1.6,1,2.5,1s1.9-0.4,2.5-1\n\tc0.7-0.7,1-1.6,1-2.5c0-0.6-0.2-1.2-0.5-1.8c-0.1-0.3-0.3-0.7-0.7-1.3c-0.6-1-0.9-1.6-1.1-1.9c-0.2-0.7-0.3-1.3-0.3-2\n\tC11.8,6.2,11.8,6.1,11.8,6 M12,2h-0.1c-0.3,0-0.5,0.2-0.7,0.4c-0.8,1.3-1.3,2.5-1.4,3.7C9.7,7.1,9.9,8,10.2,9\n\tc0.2,0.5,0.6,1.3,1.2,2.2c0.3,0.5,0.5,0.9,0.6,1.1c0.2,0.3,0.3,0.6,0.3,0.9c0,0.4-0.1,0.8-0.4,1.1c-0.3,0.3-0.7,0.4-1.1,0.4\n\ts-0.8-0.1-1.1-0.4c-0.3-0.3-0.4-0.7-0.4-1.1V9.1c0-0.4-0.2-0.6-0.5-0.8C8.5,8.2,8.4,8.2,8.2,8.2s-0.3,0-0.5,0.1\n\tC6.7,9,5.9,9.9,5.4,11c-0.6,1.1-0.9,2.3-0.9,3.5c0,1.4,0.3,2.6,1,3.7s1.6,2.1,2.7,2.7s2.4,1,3.8,1s2.6-0.3,3.8-1s2.1-1.6,2.7-2.7\n\tc0.7-1.1,1-2.4,1-3.7c0-1.1-0.2-2.2-0.6-3.2c-0.3-0.8-0.8-1.5-1.5-2.3c-0.4-0.4-1-1.1-1.8-1.8c-0.9-0.8-1.5-1.5-1.8-1.9\n\tC13.3,4.5,13,3.8,13,3c0-0.3-0.1-0.5-0.3-0.7C12.4,2.1,12.2,2,12,2L12,2z" })));
};
exports.default = FireIcon;
