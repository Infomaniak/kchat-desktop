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
const OauthIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M12,20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S16.4,20,12,20 M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,5c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7S15.9,5,12,5z M14.8,16c-0.1,0-0.2,0-0.3,0c-0.4,0-0.8-0.3-0.9-0.6L13.1,14h-2.3\n\tl-0.4,1.4C10.3,15.7,9.9,16,9.5,16c-0.1,0-0.2,0-0.3,0c-0.5-0.1-0.8-0.7-0.6-1.2l1.9-6.1C10.7,8.3,11,8,11.4,8h1c0.1,0,0.2,0,0.3,0\n\tc0.2,0.1,0.4,0.2,0.5,0.3c0.1,0.1,0.1,0.2,0.1,0.3l2,6.1C15.5,15.3,15.3,15.8,14.8,16z M7,12c0-1.7,0.9-3.3,2.3-4.2\n\tC9.2,7.9,9.2,8.1,9.1,8.2l-1.8,5.6C7.1,13.2,7,12.6,7,12z M12,17c-0.3,0-0.6,0-0.9-0.1c0.3-0.3,0.6-0.7,0.7-1.1l0.1-0.3H12l0.1,0.4\n\tc0.1,0.4,0.4,0.8,0.7,1.1C12.6,17,12.3,17,12,17z M16.6,13.8l-1.9-5.6c0-0.2-0.1-0.3-0.2-0.4C16,8.6,17,10.2,17,12\n\tC17,12.6,16.9,13.2,16.6,13.8z" })));
};
exports.default = OauthIcon;
