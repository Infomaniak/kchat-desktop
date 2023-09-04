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
const CircleMultipleOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M14.5,17c4.142,0,7.5-3.358,7.5-7.5C22,5.358,18.642,2,14.5,2c-2.479,0-4.677,1.203-6.043,3.057C8.8,5.019,9.148,5,9.5,5\nc0.561,0,1.11,0.049,1.645,0.142C12.073,4.426,13.237,4,14.5,4C17.538,4,20,6.462,20,9.5c0,3.038-2.462,5.5-5.5,5.5\n\tc-0.524,0-1.031-0.073-1.512-0.21c-0.065-0.018-0.129-0.038-0.192-0.059c-1.18-0.384-2.186-1.157-2.864-2.167\n\tC9.615,12.093,9.37,11.57,9.21,11.012c-0.702,0.057-1.345,0.322-1.869,0.733c0.271,0.866,0.696,1.665,1.241,2.365\n\tc0.926,1.187,2.202,2.089,3.673,2.549C12.964,16.88,13.718,17,14.5,17z M14.5,19c0.352,0,0.7-0.019,1.043-0.057\n\tC14.177,20.797,11.979,22,9.5,22C5.358,22,2,18.642,2,14.5C2,10.358,5.358,7,9.5,7c1.888,0,3.613,0.698,4.932,1.849l0,0\n\tc1.028,0.898,1.809,2.072,2.227,3.406c-0.523,0.411-1.167,0.675-1.869,0.733c-0.52-1.822-1.956-3.258-3.778-3.778v0\n\tC10.531,9.073,10.024,9,9.5,9C6.462,9,4,11.462,4,14.5C4,17.538,6.462,20,9.5,20c1.263,0,2.427-0.426,3.356-1.142\n\tC13.39,18.951,13.939,19,14.5,19z" })));
};
exports.default = CircleMultipleOutlineIcon;
