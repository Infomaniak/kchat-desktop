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
const KeyVariantCircleIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M12,2c5.523,0,10,4.477,10,10s-4.477,10-10,10S2,17.523,2,12S6.477,2,12,2z M14.994,9.033c0.218,0.217,0.327,0.47,0.327,0.76s-0.109,0.543-0.327,0.76c-0.218,0.217-0.472,0.326-0.762,0.326s-0.545-0.109-0.762-0.326\n\tc-0.218-0.217-0.327-0.47-0.327-0.76s0.109-0.543,0.327-0.76c0.218-0.217,0.472-0.326,0.762-0.326S14.776,8.816,14.994,9.033z\n\t M16.555,7.477C15.902,6.826,15.115,6.5,14.195,6.5c-0.871,0-1.634,0.326-2.287,0.977c-0.508,0.507-0.823,1.11-0.944,1.809\n\tc-0.097,0.675,0.012,1.315,0.327,1.918L6.5,15.98l1.525,1.52l1.561-1.556l1.561,1.556l1.525-1.52l-1.561-1.556l1.706-1.701\n\tc0.605,0.314,1.246,0.422,1.924,0.326c0.702-0.121,1.307-0.434,1.815-0.941c0.653-0.651,0.968-1.423,0.944-2.316\n\tC17.523,8.9,17.208,8.128,16.555,7.477z" })));
};
exports.default = KeyVariantCircleIcon;
