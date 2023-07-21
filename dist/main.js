/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/todo.js


class Todo {
	constructor(title, description, dueDate, priority, color, checklistItems) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.color = color;
		this.checklistItems = checklistItems;
	}
}

/* harmony default export */ const todo = (Todo);
;// CONCATENATED MODULE: ./src/modules/workspace.js


class Workspace {
	constructor(title, description, color, todos) {
		this.title = title;
		this.description = description;
		this.color = color;
		if (todos === undefined) this.todos = [];
		else this.todos = todos;
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

	const openWorkspace = (workspace) => {
		workspace.todos.forEach((todo) => {
			const todoElement = document.createElement("div");
			todoElement.classList.add("todo");
			todoElement.textContent = todo.title;
			todos.appendChild(todoElement);
		});
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
const exampleTodo = new todo("Example", "This is an example todo", "2023-10-25", 1, "#98971a");
generalWorkspace.todos.push(exampleTodo);
storage.workspaces.push(generalWorkspace);
dom.displayWorkspaces();
dom.openWorkspace(generalWorkspace);
/******/ })()
;