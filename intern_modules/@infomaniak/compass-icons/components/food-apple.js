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
const FoodAppleIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M18.7,2c-2,0-3.8,0.3-5.3,1.2c-0.7,0.4-1.2,0.9-1.6,1.6c-0.1-0.1-0.2-0.2-0.3-0.3c-0.8-0.8-1.8-1.5-2.7-1.9\nC8.3,2.4,7.7,2.7,7.6,3.2C7.4,3.7,7.7,4.3,8.2,4.4c0.6,0.2,1.3,0.7,1.9,1.3c0.3,0.3,0.5,0.6,0.6,0.8C9,6.3,7.3,6.4,5.9,7.2\n\tc-2,1-3.1,3.1-2.9,5.9c0.3,3,1.4,5.2,3,6.7c1.7,1.5,3.8,2.2,6,2.2c4,0,8.4-2.9,9-8.9c0.3-2.8-0.9-4.9-2.7-6c1-1.1,1.6-2.5,1.7-3.8\n\tC20,2.6,19.4,2,18.7,2z M17.8,4c-0.2,0.7-0.7,1.5-1.4,2.1c-0.8,0.7-1.9,1.2-3.4,1c0.2-1.2,0.7-1.8,1.4-2.3C15.3,4.4,16.4,4.1,17.8,4\n\tz M12,9c1.7,0.3,3.3,0.1,4.5-0.5c1.4,0.4,2.7,1.9,2.5,4.4c-0.5,5-4,7.1-7,7.1c-1.8,0-3.4-0.6-4.6-1.7c-1.2-1.1-2.1-2.9-2.4-5.4\n\tc-0.2-2.1,0.6-3.3,1.8-3.9c1.2-0.6,3-0.7,4.9,0c0.1,0,0.2,0,0.2,0.1C11.9,9,12,9,12,9z" })));
};
exports.default = FoodAppleIcon;
