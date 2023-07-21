/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/workspace.js


class Workspace {
	constructor(title, description, color, todos) {
		this.title = title;
		this.description = description;
		this.color = color;
		this.todos = todos;
	}
}

/* harmony default export */ const workspace = (Workspace);
;// CONCATENATED MODULE: ./src/modules/storage.js
const Storage = (function () {
	let workspaces = [];
	return { workspaces };
})();

/* harmony default export */ const storage = (Storage);
;// CONCATENATED MODULE: ./src/modules/dom.js


const Dom = (function () {
	const content = document.querySelector("#content");
	const toolbar = document.querySelector(".toolbar");
	const workspaces = document.querySelector(".workspaces");
	const todos = document.querySelector(".todos");

	const openWorkspace = () => {
		// function logic goes here
	};

	const displayWorkspaces = () => {
		storage.workspaces.forEach((workspace) => {
			const workspaceElement = document.createElement("div");
			workspaceElement.classList.add("workspace");
			workspaceElement.textContent = workspace.title;
			workspaces.appendChild(workspaceElement);
		});
	};
	return { openWorkspace, displayWorkspaces };
})();

/* harmony default export */ const dom = (Dom);
;// CONCATENATED MODULE: ./src/script.js







const noscript = document.querySelector(".noscript");
noscript.remove();

const generalWorkspace = new workspace("General", "A workspace for general todos", "#458588");
storage.workspaces.push(generalWorkspace);
dom.displayWorkspaces();
/******/ })()
;