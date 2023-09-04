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
const BrandGoogleIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M16.033,7.457c-1.032-0.985-2.41-1.521-3.836-1.499c-2.609,0-4.824,1.76-5.614,4.129c-0.419,1.242-0.419,2.587,0,3.829h0.003c0.794,2.366,3.006,4.126,5.614,4.126c1.347,0,2.503-0.345,3.399-0.953v-0.002c1.055-0.698,1.775-1.797,1.999-3.039h-5.401\n\tv-3.851h9.432c0.118,0.669,0.173,1.352,0.173,2.032c0,3.042-1.087,5.613-2.978,7.354l0.002,0.002C17.169,21.114,14.894,22,12.197,22\n\tc-3.781,0-7.238-2.131-8.936-5.508c-1.418-2.825-1.418-6.155,0-8.98c1.698-3.38,5.155-5.512,8.936-5.512\n\tc2.484-0.029,4.883,0.904,6.691,2.601L16.033,7.457z" })));
};
exports.default = BrandGoogleIcon;
