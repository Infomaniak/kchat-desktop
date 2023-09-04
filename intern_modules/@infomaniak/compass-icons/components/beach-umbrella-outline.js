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
const BeachUmbrellaOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M7.9,7.9c1.8-1.8,4.3-2.6,6.6-2.4c-0.6,0.8-1.1,1.8-1.2,2.8C12,8.4,10.8,9,9.9,9.9C9,10.8,8.4,12,8.2,13.3c-1,0.2-2,0.6-2.8,1.2C5.2,12.1,6.1,9.7,7.9,7.9 M6.5,6.4c-3.5,3.5-4,8.9-1.4,12.8c0-1,0.4-2.1,1.2-2.9c1.1-1.1,2.6-1.4,4-1.1\n\tc-0.4-1.3-0.1-2.9,1.1-4c1.1-1.1,2.6-1.4,4-1.1c-0.4-1.3,0-2.9,1.1-4c0.8-0.8,1.8-1.2,2.8-1.2C15.3,2.5,10,2.9,6.5,6.4L6.5,6.4z\n\t M20.6,19.2l-1.4,1.4l-7.1-7.1l1.4-1.4L20.6,19.2z" })));
};
exports.default = BeachUmbrellaOutlineIcon;
