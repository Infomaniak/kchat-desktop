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
const ProductPlaybooksIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M8,3.5H6c-1.105,0-2,0.895-2,2V19c0,1.105,0.895,2,2,2h12c1.105,0,2-0.895,2-2V5.5c0-1.105-0.895-2-2-2h-2V5h1.5c0.552,0,1,0.448,1,1v12.5c0,0.552-0.448,1-1,1h-11c-0.552,0-1-0.448-1-1V6c0-0.552,0.448-1,1-1H8V3.5z M11,2\n\tc-0.276,0-0.5,0.224-0.5,0.5V3H9v2.5h6V3h-1.5V2.5C13.5,2.224,13.276,2,13,2H11z M10.5,16H17v1h-6.5V16z M7.5,15.75H9v1.5H7.5V15.75\n\tz M10.5,12H17v1h-6.5V12z M7.5,11.75H9v1.5H7.5V11.75z M10.5,8H17v1h-6.5V8z M7.409,9.091l-0.5-0.5l0.5-0.5l0.5,0.5L9,7.5L9.5,8\n\tL7.909,9.591L7.409,9.091z" })));
};
exports.default = ProductPlaybooksIcon;
