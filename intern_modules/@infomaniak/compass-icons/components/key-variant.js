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
const KeyVariantIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M17.444,6.605C17.84,7,18.038,7.461,18.038,7.987s-0.198,0.987-0.594,1.382c-0.396,0.395-0.858,0.592-1.386,0.592\ns-0.99-0.197-1.386-0.592c-0.396-0.395-0.594-0.855-0.594-1.382S14.276,7,14.672,6.605c0.396-0.395,0.858-0.592,1.386-0.592\n\tS17.048,6.211,17.444,6.605z M20.282,3.776C19.094,2.592,17.664,2,15.992,2c-1.584,0-2.97,0.592-4.158,1.776\n\tc-0.924,0.921-1.496,2.018-1.716,3.289c-0.176,1.228,0.022,2.39,0.594,3.487L2,19.237L4.772,22l2.838-2.829L10.448,22l2.772-2.763\n\tl-2.838-2.829l3.102-3.092c1.1,0.57,2.266,0.768,3.498,0.592c1.276-0.219,2.376-0.789,3.3-1.71c1.188-1.184,1.76-2.588,1.716-4.211\n\tC22.042,6.364,21.47,4.961,20.282,3.776z" })));
};
exports.default = KeyVariantIcon;
