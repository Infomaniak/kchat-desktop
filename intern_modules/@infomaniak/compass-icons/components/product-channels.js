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
const ProductChannelsIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M6,7.75c0.69,0,1.25,0.56,1.25,1.25S6.69,10.25,6,10.25S4.75,9.69,4.75,9S5.31,7.75,6,7.75z M10.5,7.75c0.69,0,1.25,0.56,1.25,1.25s-0.56,1.25-1.25,1.25c-0.69,0-1.25-0.56-1.25-1.25S9.81,7.75,10.5,7.75z M16.25,9\n\tc0-0.69-0.56-1.25-1.25-1.25S13.75,8.31,13.75,9s0.56,1.25,1.25,1.25S16.25,9.69,16.25,9z M4,3C2.895,3,2,3.895,2,5v8\n\tc0,1.105,0.895,2,2,2h2v4l3.636-4H17c1.105,0,2-0.895,2-2V5c0-1.105-0.895-2-2-2H4z M11,13.5H9.318l-1.818,2v-2H6H4.5\n\tc-0.552,0-1-0.448-1-1v-7c0-0.552,0.448-1,1-1h12c0.552,0,1,0.448,1,1v7c0,0.552-0.448,1-1,1H11z M10.063,16.5\n\tC10.285,17.363,11.068,18,12,18h2.364L18,22v-4h2c1.104,0,2-0.896,2-2V8c0-0.932-0.637-1.715-1.5-1.937V8.5v7c0,0.552-0.448,1-1,1\n\tH18h-1.5v2l-1.818-2H13h-0.5H10.063z" })));
};
exports.default = ProductChannelsIcon;
