/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(1));
const path = __importStar(__webpack_require__(2));
const cp = __importStar(__webpack_require__(3));
function activate(context) {
    console.log("FAAA is watching your failures 👀");
    const soundPath = path.join(context.extensionPath, "sounds", "faaa.mp3");
    // Method 1: VS Code Task failures
    context.subscriptions.push(vscode.tasks.onDidEndTaskProcess((e) => {
        if (e.exitCode === undefined || e.exitCode === 0)
            return;
        if (e.exitCode === 130)
            return;
        playSound(soundPath);
    }));
    // Method 2: Terminal commands (shell integration)
    context.subscriptions.push(vscode.window.onDidEndTerminalShellExecution((e) => {
        if (e.exitCode === undefined || e.exitCode === 0)
            return;
        // 130 = Ctrl+C (SIGINT), user intentionally cancelled
        if (e.exitCode === 130)
            return;
        // Skip agent/extension-owned terminals
        const terminalName = e.terminal.name.toLowerCase();
        const agentTerminals = [
            "agent",
            "copilot",
            "claude",
            "task",
            "extension",
        ];
        if (agentTerminals.some((name) => terminalName.includes(name)))
            return;
        // Skip package installs — Ctrl+C on these also exits with code 1 on Mac
        const cmd = e.execution.commandLine.value.toLowerCase().trim();
        const ignore = [
            "npm i",
            "npm install",
            "yarn install",
            "yarn add",
            "pnpm install",
            "pnpm add",
            "pip install",
            "brew",
        ];
        if (ignore.some((c) => cmd.startsWith(c)))
            return;
        playSound(soundPath);
    }));
}
function playSound(filePath) {
    const platform = process.platform;
    let cmd;
    if (platform === "darwin") {
        cmd = `afplay "${filePath}"`;
    }
    else if (platform === "linux") {
        cmd = `mpg123 -q "${filePath}" 2>/dev/null || aplay "${filePath}"`;
    }
    else if (platform === "win32") {
        cmd = `powershell -c "$p = New-Object System.Windows.Media.MediaPlayer; $p.Open('${filePath}'); $p.Play(); Start-Sleep 3"`;
    }
    else {
        return;
    }
    cp.exec(cmd, (err) => {
        if (err)
            console.error("FAAA failed to FAAA:", err.message);
    });
}
function deactivate() { }


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("child_process");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map