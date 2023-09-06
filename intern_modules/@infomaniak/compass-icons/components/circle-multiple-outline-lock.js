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
const CircleMultipleOutlineLockIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M22,16v-1.5c0-1.933-1.567-3.5-3.5-3.5S15,12.567,15,14.5V16c-0.552,0-1,0.448-1,1v5c0,0.552,0.448,1,1,1h7c0.552,0,1-0.448,1-1v-5C23,16.448,22.552,16,22,16z M16.5,14.5c0-1.103,0.897-2,2-2s2,0.897,2,2V16h-4V14.5z M11.145,5.142\n\tC12.073,4.426,13.237,4,14.5,4c2.94,0,5.333,2.307,5.485,5.209c0.732,0.206,1.403,0.556,1.978,1.023C21.986,9.991,22,9.747,22,9.5\n\tC22,5.358,18.642,2,14.5,2c-2.479,0-4.677,1.203-6.043,3.057C8.8,5.019,9.148,5,9.5,5C10.061,5,10.61,5.049,11.145,5.142z M12,19.39\n\tC11.249,19.775,10.402,20,9.5,20C6.462,20,4,17.538,4,14.5S6.462,9,9.5,9c0.524,0,1.031,0.073,1.512,0.21\n\tc1.227,0.35,2.27,1.122,2.985,2.141c0.388-0.554,0.873-1.035,1.435-1.413c-0.302-0.392-0.628-0.764-1-1.089\n\tC13.113,7.698,11.388,7,9.5,7C5.358,7,2,10.358,2,14.5S5.358,22,9.5,22c0.878,0,1.717-0.157,2.5-0.435V19.39z M9.932,12.564\n\tC9.615,12.093,9.37,11.57,9.21,11.012c-0.702,0.057-1.345,0.322-1.869,0.733c0.271,0.866,0.696,1.665,1.241,2.365\n\tc0.881,1.129,2.084,1.987,3.464,2.465c0.101-0.703,0.433-1.33,0.934-1.788c-0.062-0.017-0.124-0.036-0.184-0.057\n\tC11.616,14.347,10.61,13.574,9.932,12.564z" })));
};
exports.default = CircleMultipleOutlineLockIcon;
