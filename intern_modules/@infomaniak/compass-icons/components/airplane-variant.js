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
const AirplaneVariantIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M19.293,4.707c-0.41-0.41-1.159-0.448-1.608,0c-0.325,0.326-0.706,0.71-1.11,1.12l-0.071,0.071c-0.429,0.435-0.883,0.894-1.319,1.33l-0.378,0.378l-7.5-1.5l-0.92,0.92l7,2l-5.58,5.58l-2-0.5l-1.002,1.002l2.971,1.114\n\tl1.114,2.971l1.002-1.002l-0.5-2l5.58-5.58l2,7l0.92-0.92l-1.5-7.5l2.878-2.878c0.167-0.167,0.293-0.461,0.297-0.813\n\tC19.571,5.149,19.451,4.865,19.293,4.707z M16.271,3.293c1.287-1.287,3.303-1.132,4.436,0c0.613,0.613,0.868,1.455,0.861,2.228\n\tc-0.007,0.773-0.278,1.604-0.882,2.208L18.564,9.85l1.369,6.844c0.082,0.41-0.046,0.833-0.342,1.129l-2.105,2.105\n\tc-0.674,0.674-1.824,0.376-2.086-0.541l-1.416-4.957l-2.376,2.376l0.328,1.313c0.107,0.426-0.018,0.877-0.329,1.187l-2.125,2.125\n\tc-0.643,0.643-1.735,0.406-2.054-0.445l-1.204-3.211l-3.211-1.204c-0.851-0.319-1.088-1.411-0.445-2.054l2.125-2.125\n\tc0.31-0.31,0.761-0.435,1.187-0.329l1.313,0.328l2.376-2.376L4.612,8.6c-0.916-0.262-1.214-1.412-0.54-2.086l2.105-2.105\n\tc0.296-0.296,0.719-0.424,1.129-0.342l6.843,1.369c0.312-0.314,0.628-0.633,0.933-0.943l0.073-0.074\n\tC15.557,4.012,15.941,3.623,16.271,3.293z" })));
};
exports.default = AirplaneVariantIcon;
