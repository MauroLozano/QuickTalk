/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/client.js":
/*!******************************!*\
  !*** ./client/src/client.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nconst socket = new WebSocket('ws://localhost:3000'); // Creates a new WebSocket connection to the server at ws://localhost:3000\r\nconsole.log('WebSocket client initialized'); // Log to indicate the client has been initialized\r\n\r\n// Chat element references\r\nconst chatForm = document.getElementById('chat-form');\r\nconst chatInput = document.getElementById('chat-chatInput');\r\nconst submitBtn = document.getElementById('btn-send')\r\nconst messages = document.getElementById('messages')\r\n\r\n// The following code handles the WebSocket connection and message sending/receiving\r\nsocket.onopen = ()=>{   // Event handler for when the WebSocket connection is opened\r\n    console.log('Connected to the WebSocket server');\r\n    chatForm.addEventListener('submit', (e)=>{ //Listens when the submit button is activated\r\n        e.preventDefault(); // Prevents the default chatForm submission behavior\r\n        if(chatInput.value){    // Checks if the chatInput field is not empty\r\n            socket.send(JSON.stringify({  // Sends a message to the WebSocket server in a String chatFormat, Websockets require messages to be sent as strings or binary data\r\n                type: 'message',\r\n                content: chatInput.value,\r\n            }));\r\n            chatInput.value=''; // Clears the chatInput field after sending the message\r\n        }\r\n    })\r\n}\r\nsocket.onmessage = (event)=>{   // Event handler for when a message is received from the WebSocket server\r\n    const msgData = JSON.parse(event.data)\r\n    let msgItem = `<li class=\"chat-msg\">${msgData.content}</li>`;  // Creates a new list item with the received message\r\n    messages.insertAdjacentHTML('beforeend', msgItem); // Inserts the new message into the messages list\r\n}\r\nsocket.onerror = (error) => {\r\n    console.error('Error:', error);\r\n};\n\n//# sourceURL=webpack://chat/./client/src/client.js?");

/***/ }),

/***/ "./client/src/clientAuth.js":
/*!**********************************!*\
  !*** ./client/src/clientAuth.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n// Authentication form element references\r\nconst authChangeBtn = document.getElementById('authChange')\r\n\r\nconst registerForm = document.getElementById('register-form');\r\nconst registerUsernameInput = document.getElementById('register-username');\r\nconst registerPasswordInput = document.getElementById('register-password');\r\n\r\nconst loginForm = document.getElementById('login-form');\r\nconst loginUsernameInput = document.getElementById('login-username');\r\nconst loginPasswordInput = document.getElementById('login-password');\r\n\r\n// The following code handles the authentication form toggling\r\nauthChangeBtn.addEventListener('click',(e)=>{\r\n    if(registerForm.classList.contains('auth-form--enabled')){\r\n        registerForm.classList.remove('auth-form--enabled');\r\n        registerForm.classList.add('auth-form--disabled');\r\n        loginForm.classList.remove('auth-form--disabled');\r\n        loginForm.classList.add('auth-form--enabled');\r\n        authChangeBtn.textContent = 'Register';\r\n    }\r\n    else if(loginForm.classList.contains('auth-form--enabled')){\r\n        loginForm.classList.remove('auth-form--enabled');\r\n        loginForm.classList.add('auth-form--disabled');\r\n        registerForm.classList.remove('auth-form--disabled');\r\n        registerForm.classList.add('auth-form--enabled');\r\n        authChangeBtn.textContent = 'Login';\r\n    }\r\n})\r\n// The following code handles the registration form submission\r\nregisterForm.addEventListener('submit',(e)=>{\r\n    e.preventDefault(); // Prevents the default form submission behavior\r\n    if(registerUsernameInput.value && registerPasswordInput.value){\r\n        register(registerUsernameInput.value,registerPasswordInput.value)\r\n    }\r\n})\r\nloginForm.addEventListener('submit',(e)=>{\r\n    e.preventDefault();\r\n    if(loginUsernameInput.value && loginPasswordInput.value){\r\n        login(loginUsernameInput.value,loginPasswordInput.value)\r\n    }\r\n})\r\nasync function register(userName, password) {\r\n    const response = await fetch('/api/register', { // Sends a POST request to the server to register a new user\r\n        method:'POST',\r\n        headers: {contentType: 'application/json'},\r\n        body: JSON.stringify({\r\n            userName: userName,\r\n            password: password\r\n        })\r\n    })\r\n    console.log('Register response:', response); // Logs the response from the server\r\n}\n\n//# sourceURL=webpack://chat/./client/src/clientAuth.js?");

/***/ }),

/***/ "./client/src/main.js":
/*!****************************!*\
  !*** ./client/src/main.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client.js */ \"./client/src/client.js\");\n/* harmony import */ var _clientAuth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clientAuth.js */ \"./client/src/clientAuth.js\");\n/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/main.css */ \"./client/styles/main.css\");\n\r\n\r\n\n\n//# sourceURL=webpack://chat/./client/src/main.js?");

/***/ }),

/***/ "./client/styles/main.css":
/*!********************************!*\
  !*** ./client/styles/main.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://chat/./client/styles/main.css?");

/***/ })

/******/ 	});
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/src/main.js");
/******/ 	
/******/ })()
;