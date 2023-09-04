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
const MattermostIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M17.876,3.909l0.105,2.122c1.721,1.901,2.4,4.593,1.543,7.124c-1.279,3.777-5.495,5.763-9.417,4.435c-3.922-1.328-6.066-5.466-4.787-9.243c0.86-2.539,3.047-4.269,5.579-4.727l1.368-1.617C7.999,1.888,3.972,4.538,2.531,8.794\n\tc-1.77,5.23,1.034,10.905,6.264,12.675S19.7,20.435,21.47,15.205C22.908,10.956,21.326,6.412,17.876,3.909z M15.425,10.172\n\tl-0.072-2.967l-0.058-1.707l-0.039-1.479c0,0,0.008-0.713-0.017-0.881c-0.005-0.035-0.016-0.064-0.03-0.089l-0.005-0.01L15.198,3.03\n\tc-0.027-0.047-0.07-0.085-0.126-0.104c-0.057-0.019-0.116-0.014-0.167,0.008l-0.003,0.001l-0.018,0.009\n\tc-0.024,0.012-0.049,0.027-0.073,0.051c-0.122,0.118-0.548,0.69-0.548,0.69l-0.93,1.151L12.25,6.154l-1.86,2.313\n\tc0,0-0.854,1.065-0.665,2.377c0.189,1.311,1.163,1.95,1.92,2.206c0.756,0.256,1.919,0.341,2.865-0.586\n\tC15.456,11.536,15.425,10.172,15.425,10.172z" })));
};
exports.default = MattermostIcon;
