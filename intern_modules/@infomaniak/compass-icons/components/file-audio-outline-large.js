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
const FileAudioOutlineLargeIcon = (_a) => {
    var { size, color } = _a, rest = __rest(_a, ["size", "color"]);
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", version: "1.1", width: size || 24, height: size || 24, fill: color || '#000000', viewBox: "0 0 24 24" }, rest),
        react_1.default.createElement("path", { d: "M18,2H9.949C9.552,2,9.178,2.154,8.895,2.432l-4.449,4.39l0,0C4.163,7.103,4,7.492,4,7.89V20c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C20,2.897,19.103,2,18,2z M9,3.734V7.5H5.184L9,3.734z M19,20c0,0.551-0.449,1-1,1H6c-0.552,0-1-0.449-1-1\n\tV8.5h4c0.552,0,1-0.448,1-1V3h8c0.551,0,1,0.448,1,1V20z M12.377,11.447L10.565,13h-2.04L8,13.025v3.45L8.025,17h2.54l1.57,1.346\n\tl0.271,0.21L13,18.265v-6.211l-0.015-0.342L12.377,11.447z M12,16.913L10.935,16H9v-2h1.935L12,13.087V16.913z M15.355,12.676\n\tc-0.162-0.111-0.376-0.059-0.479,0.116c-0.102,0.175-0.055,0.407,0.107,0.518c0.574,0.394,0.917,1.063,0.917,1.791\n\tc0,0.728-0.343,1.397-0.917,1.791c-0.162,0.111-0.21,0.342-0.107,0.517c0.094,0.161,0.305,0.235,0.479,0.116\n\tc0.776-0.532,1.24-1.438,1.24-2.424C16.595,14.114,16.132,13.208,15.355,12.676z M14.546,13.899\n\tc-0.167-0.099-0.379-0.034-0.471,0.148c-0.088,0.172-0.037,0.387,0.112,0.494l0.024,0.016c0.187,0.111,0.303,0.319,0.303,0.544\n\tc0,0.211-0.103,0.409-0.27,0.523l-0.032,0.021c-0.168,0.1-0.229,0.328-0.137,0.51c0.093,0.182,0.304,0.247,0.471,0.148\n\tc0.408-0.243,0.662-0.703,0.662-1.201C15.208,14.602,14.954,14.142,14.546,13.899z" })));
};
exports.default = FileAudioOutlineLargeIcon;
