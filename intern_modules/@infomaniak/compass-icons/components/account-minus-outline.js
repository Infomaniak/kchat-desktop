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
const AccountMinusOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M5.033,19C4.463,19,4,18.528,4,17.945c0-0.105,0.015-0.208,0.044-0.306c0.058-0.195,0.171-0.37,0.324-0.501c0.076-0.066,0.163-0.121,0.258-0.162l3.093-1.857C8.387,15.52,9.151,15.75,10,15.75s1.613-0.23,2.28-0.631l0.352,0.211\n\tc0.302-0.606,0.701-1.156,1.181-1.624l-0.006-0.004c1.045-1.391,1.622-3.311,1.622-5.203C15.429,5.21,13.247,3,10,3\n\tS4.571,5.21,4.571,8.5c0,1.891,0.577,3.812,1.622,5.203l-2.515,1.51C2.653,15.727,2,16.783,2,17.945C2,19.63,3.361,21,5.033,21\n\th7.776c-0.352-0.608-0.599-1.282-0.719-2H5.033z M10,5c1.894,0,3.429,1.084,3.429,3.5c0,1.482-0.485,3.117-1.353,4.163\n\tc-0.548,0.66-1.247,1.087-2.076,1.087c-0.268,0-0.522-0.044-0.763-0.126c-0.12-0.041-0.237-0.092-0.35-0.151\n\tc-0.226-0.119-0.437-0.272-0.633-0.453c-0.116-0.108-0.225-0.229-0.331-0.356c-0.072-0.086-0.143-0.174-0.209-0.268\n\tC7.55,12.164,7.403,11.91,7.272,11.64c-0.194-0.406-0.351-0.846-0.466-1.3C6.729,10.037,6.67,9.728,6.631,9.419\n\tc-0.04-0.308-0.06-0.617-0.06-0.919C6.571,6.084,8.106,5,10,5z M22,17v2h-8v-2H22z" })));
};
exports.default = AccountMinusOutlineIcon;
