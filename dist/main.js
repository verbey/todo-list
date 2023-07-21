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
			const todoCont = document.createElement("div");
			todoCont.classList.add("todoCont");
			todoCont.style.background = todo.color;

			const todoTitle = document.createElement("h2");
			todoTitle.textContent = todo.title;
			todoCont.appendChild(todoTitle);

			const todoDesc = document.createElement("p");
			todoDesc.textContent = todo.description;
			todoCont.appendChild(todoDesc);

			const todoDue = document.createElement("div");
			todoDue.textContent = `Due date: ${todo.dueDate}`;
			todoCont.appendChild(todoDue);

			const todoPriority = document.createElement("div");
			todoPriority.textContent = `Priority: ${todo.priority}`;
			todoCont.appendChild(todoPriority);

			if (todo.checklistItems) {
				const todoChecklistCont = document.createElement("div");
				todo.checklistItems.forEach((item) => {
					const todoChecklistItem = document.createElement("div");
					todoChecklistItem.textContent = item.title;
					todoChecklistCont.appendChild(todoChecklistItem);
				});
				todoCont.appendChild(todoChecklistCont);
			}

			todos.appendChild(todoCont);
		});
	};

	const displayWorkspaces = () => {
		storage.workspaces.forEach((workspace) => {
			const workspaceElement = document.createElement("div");
			workspaceElement.classList.add("workspace");
			workspaceElement.textContent = workspace.title;
			workspaceElement.style.background = workspace.color;
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