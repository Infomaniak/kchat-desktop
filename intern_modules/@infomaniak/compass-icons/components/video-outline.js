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
const VideoOutlineIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M18,8V6c0-1.105-0.895-2-2-2H4C2.895,4,2,4.895,2,6v12c0,1.105,0.895,2,2,2h12c1.105,0,2-0.895,2-2v-2l2.553,1.276C21.218,17.609,22,17.125,22,16.382V7.618c0-0.743-0.782-1.227-1.447-0.894L18,8z M20,14.764l-2-1l-1.276-0.638\n\tC16.391,12.959,16,13.201,16,13.573V15v3H4V6h12v3v1.427c0,0.372,0.391,0.613,0.724,0.447L18,10.236l2-1V14.764z" })));
};
exports.default = VideoOutlineIcon;
