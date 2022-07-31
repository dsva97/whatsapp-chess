"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOARD_FILES_PATH = exports.ASSETS_PATH = void 0;
const path_1 = require("path");
exports.ASSETS_PATH = (0, path_1.resolve)(__dirname, "../../assets");
exports.BOARD_FILES_PATH = (0, path_1.resolve)(__dirname, "../../boards");
