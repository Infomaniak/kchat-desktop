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
const PinOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M21.706,9.801L20.707,8.8l-6.492-6.504c-0.002-0.002-0.004-0.004-0.006-0.006c-0.392-0.389-1.024-0.387-1.413,0.006C12.794,2.298,12.792,2.3,12.79,2.302c-0.388,0.392-0.386,1.026,0.006,1.415l0.3,0.29L8.651,8.41\n\tC6.958,8.199,5.238,8.426,3.657,9.07C3.335,9.185,3.094,9.457,3.018,9.79c-0.064,0.333,0.045,0.676,0.29,0.911l4.243,4.25\n\tL3.5,19.001l-1,2.499l2.5-1l4.049-4.048l4.247,4.255c0.245,0.241,0.595,0.339,0.929,0.26c0.333-0.076,0.605-0.318,0.719-0.64\n\tc0.643-1.584,0.87-3.306,0.659-5.003l4.395-4.403l0.29,0.3c0.392,0.392,1.027,0.392,1.418,0\n\tC22.098,10.829,22.098,10.193,21.706,9.801z M13.765,14.274c-0.262,0.262-0.358,0.646-0.25,1.001c0.235,0.926,0.235,1.896,0,2.822\n\tl-7.61-7.626c0.924-0.235,1.892-0.235,2.817,0c0.354,0.108,0.738,0.012,0.999-0.25l4.784-4.803l4.055,4.063L13.765,14.274z" })));
};
exports.default = PinOutlineIcon;
