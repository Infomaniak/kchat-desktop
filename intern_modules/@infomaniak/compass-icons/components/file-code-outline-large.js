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
const FileCodeOutlineLargeIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M18,2H9.949C9.552,2,9.178,2.154,8.895,2.432l-4.449,4.39l0,0C4.163,7.103,4,7.492,4,7.89V20c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C20,2.897,19.103,2,18,2z M9,3.734V7.5H5.184L9,3.734z M19,20c0,0.551-0.449,1-1,1H6c-0.552,0-1-0.449-1-1\n\tV8.5h4c0.552,0,1-0.448,1-1V3h8c0.551,0,1,0.448,1,1V20z M14.137,12.562c-0.096-0.088-0.246-0.083-0.333,0.011l-0.377,0.396\n\tc-0.044,0.046-0.067,0.107-0.065,0.17c0.003,0.063,0.031,0.124,0.08,0.167l1.366,1.192l-1.366,1.192\n\tc-0.049,0.042-0.077,0.101-0.08,0.166c-0.003,0.063,0.021,0.126,0.065,0.173l0.379,0.398c0.047,0.048,0.109,0.072,0.171,0.072\n\tc0.058,0,0.115-0.021,0.16-0.062l1.913-1.766c0.047-0.044,0.075-0.107,0.075-0.171s-0.027-0.127-0.075-0.172L14.137,12.562z\n\t M10.639,15.859c-0.003-0.063-0.031-0.124-0.08-0.167L9.193,14.5l1.365-1.192c0.049-0.042,0.077-0.101,0.08-0.165\n\tc0.003-0.063-0.02-0.127-0.064-0.174l-0.378-0.396c-0.089-0.093-0.238-0.097-0.332-0.011L7.95,14.329\n\tc-0.048,0.044-0.075,0.107-0.075,0.171s0.027,0.127,0.076,0.172l1.914,1.765C9.91,16.479,9.967,16.5,10.024,16.5\n\tc0.062,0,0.124-0.024,0.171-0.072l0.38-0.398C10.619,15.983,10.642,15.923,10.639,15.859z M13.455,11.151\n\tc-0.031-0.055-0.082-0.095-0.142-0.112l-0.54-0.155c-0.128-0.036-0.256,0.037-0.292,0.16l-1.956,6.627\n\tc-0.017,0.059-0.01,0.122,0.02,0.177c0.031,0.056,0.081,0.096,0.142,0.113l0.539,0.154h0.001c0.021,0.006,0.043,0.009,0.064,0.009\n\tc0.103,0,0.198-0.067,0.227-0.169l1.956-6.627C13.492,11.269,13.485,11.206,13.455,11.151z" })));
};
exports.default = FileCodeOutlineLargeIcon;
