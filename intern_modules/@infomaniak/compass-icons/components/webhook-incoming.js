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
const WebhookIncomingIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M15.3,11.1l-1.4-2.6c0.3-0.3,0.4-0.7,0.5-1.1c0-1-0.8-1.9-1.8-2c-1,0-2,0.8-2,1.8s0.8,1.9,1.9,2h0.2l1.3,2.5C14.3,11.4,14.8,11.3,15.3,11.1z M9.7,8.6C9,7,9.7,5.2,11.2,4.5c1.6-0.7,3.4,0.1,4,1.7c0.4,0.9,0.3,1.9-0.1,2.7l1.2,0.7\n\tc0.7-1.2,0.8-2.7,0.2-4.1c-1-2.3-3.7-3.5-6-2.5S7.1,6.7,8.1,9c0.2,0.6,0.7,1.2,1.1,1.6l-2.3,3.8c-0.4-0.1-0.8,0-1.2,0.2\n\tc-0.9,0.5-1.3,1.6-0.8,2.6c0.5,0.9,1.7,1.3,2.6,0.8c0.9-0.5,1.3-1.6,0.8-2.5c0-0.1-0.1-0.1-0.1-0.2l3.1-5L11,10.1\n\tC10.4,9.8,9.9,9.3,9.7,8.6z M11.1,15.6H9.8v1c-0.1,0.5-0.2,1-0.6,1.4c-1,1.4-2.9,1.8-4.3,0.8s-1.7-2.9-0.7-4.3\n\tc0.6-0.8,1.4-1.3,2.4-1.4v-1.4c-1.4,0.1-2.7,0.7-3.6,2c-1.4,2.1-1,5,1.1,6.4c2.1,1.5,4.9,1,6.4-1.1c0.3-0.5,0.5-1,0.6-1.5\n\tc-0.1-0.3-0.1-0.6-0.1-1C11,16.2,11,15.9,11.1,15.6z M16,15.5v-2l-3,3l3,3v-2h4v-2H16z" })));
};
exports.default = WebhookIncomingIcon;
