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
const FileWordOutlineLargeIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M18,2H9.949C9.552,2,9.178,2.154,8.895,2.432l-4.449,4.39l0,0C4.163,7.103,4,7.492,4,7.89V20c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C20,2.897,19.103,2,18,2z M9,3.734V7.5H5.184L9,3.734z M19,20c0,0.551-0.449,1-1,1H6c-0.552,0-1-0.449-1-1\n\tV8.5h4c0.552,0,1-0.448,1-1V3h8c0.551,0,1,0.448,1,1V20z M14.016,15.275c-0.035,0.143-0.073,0.319-0.114,0.526l-0.047,0.247\n\tc-0.047,0.255-0.085,0.476-0.111,0.664l-0.018,0.134c-0.023-0.172-0.054-0.371-0.094-0.597l-0.036-0.2\n\tc-0.048-0.262-0.089-0.466-0.123-0.614l-0.018-0.075L12.594,12H11.41l-0.861,3.361c-0.051,0.181-0.106,0.434-0.164,0.761\n\tl-0.013,0.074c-0.051,0.29-0.083,0.507-0.098,0.65c-0.059-0.443-0.155-0.967-0.287-1.572L9.232,12H8l1.507,6h1.422l0.804-3.175\n\tc0.024-0.098,0.054-0.235,0.09-0.411l0.078-0.392c0.037-0.194,0.064-0.35,0.081-0.47l0.014-0.107\n\tc0.008,0.09,0.033,0.246,0.075,0.466l0.061,0.307c0.056,0.273,0.098,0.468,0.126,0.583L13.071,18h1.426L16,12h-1.232L14.016,15.275z\n\t" })));
};
exports.default = FileWordOutlineLargeIcon;
