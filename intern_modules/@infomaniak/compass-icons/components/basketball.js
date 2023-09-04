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
const BasketballIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M21.96,12.781C21.984,12.523,22,12.264,22,12c0-0.161-0.017-0.317-0.024-0.476l0,0C21.725,6.232,17.353,2,12,2C6.486,2,2,6.486,2,12c0,5.354,4.232,9.725,9.524,9.976l0,0C11.683,21.983,11.839,22,12,22c0.264,0,0.524-0.016,0.782-0.04\n\tC17.672,21.579,21.579,17.672,21.96,12.781z M11.6,20.161c-1.733-0.084-3.324-0.706-4.611-1.707l5.081-5.081l1.741,1.741\n\tC12.64,16.522,11.857,18.259,11.6,20.161z M15.106,16.408l1.985,1.985c-1.037,0.828-2.278,1.406-3.636,1.651\n\tC13.7,18.687,14.279,17.446,15.106,16.408z M16.536,15.01c1.011-0.775,2.205-1.32,3.507-1.555c-0.235,1.303-0.78,2.497-1.555,3.508\n\tL16.536,15.01z M20.161,11.6c-1.847,0.249-3.536,0.997-4.921,2.113l-1.755-1.755l4.969-4.969C19.455,8.277,20.077,9.868,20.161,11.6\n\tz M7.037,5.51c1.162-0.891,2.565-1.484,4.097-1.646C10.972,5.398,10.38,6.8,9.489,7.963L7.037,5.51z M12.955,3.879\n\tc1.533,0.179,2.934,0.784,4.089,1.693l-4.974,4.973L10.786,9.26C11.995,7.76,12.778,5.906,12.955,3.879z M5.606,6.908l2.485,2.485\n\tc-1.186,0.947-2.638,1.573-4.226,1.741C4.033,9.546,4.66,8.094,5.606,6.908z M3.879,12.955c2.083-0.182,3.985-1.002,5.507-2.268\n\tl1.271,1.271l-5.086,5.085C4.663,15.889,4.058,14.488,3.879,12.955z" })));
};
exports.default = BasketballIcon;
