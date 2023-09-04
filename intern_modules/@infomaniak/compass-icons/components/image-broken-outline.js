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
const ImageBrokenOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M13.707,12.293c-0.39-0.39-1.024-0.39-1.414,0L10,14.586l-2.293-2.293c-0.39-0.39-1.024-0.39-1.414,0L3,15.586V19\nc0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2v-7.965c0-0.535-0.646-0.802-1.025-0.424L16,14.586L13.707,12.293z M19,14.414V19H5\n\tv-2.586l2-2l2.293,2.293c0.391,0.391,1.023,0.391,1.414,0L13,14.414l2.293,2.293C15.488,16.902,15.744,17,16,17\n\tc0.256,0,0.512-0.098,0.707-0.293L19,14.414z M19,3H5C3.895,3,3,3.895,3,5v5.582c0.002-0.001,0.004-0.001,0.006-0.002l-0.003,1.405\n\tc-0.001,0.526,0.635,0.791,1.008,0.419L7,9.414l2.293,2.293c0.39,0.39,1.024,0.39,1.414,0L13,9.414l2.293,2.293\n\tC15.488,11.902,15.744,12,16,12c0.256,0,0.512-0.098,0.707-0.293L21,7.414V5C21,3.895,20.105,3,19,3z M19,6.586l-3,3l-2.293-2.293\n\tc-0.391-0.391-1.023-0.391-1.414,0L10,9.586L7.707,7.293c-0.391-0.391-1.023-0.391-1.414,0L5,8.586V5h14V6.586z" })));
};
exports.default = ImageBrokenOutlineIcon;
