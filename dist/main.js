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
;// CONCATENATED MODULE: ./src/modules/storage.js


const Storage = (function () {
	let workspaces = [];
	return { workspaces };
})();

/* harmony default export */ const storage = (Storage);
;// CONCATENATED MODULE: ./src/modules/workspace.js




class Workspace {
	constructor(title, description, color, todos) {
		this.title = title;
		this.description = description;
		this.color = color;
		if (todos === undefined) this.todos = [];
		else this.todos = todos;

		storage.workspaces.push(this);

		console.log("New Workspace created:");
		console.log(this);
	}
}

/* harmony default export */ const workspace = (Workspace);
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

	const displayToolbar = () => {
		const createWorkspace = document.createElement("button");
		createWorkspace.textContent = "Create workspace";
		createWorkspace.classList.add("createWorkspace");
		createWorkspace.addEventListener("click", () => {
			console.log("Create workspace button clicked!");
		});
		toolbar.appendChild(createWorkspace);
	};

	const openWorkspaceForm = () => {
		const colorOptions = ["red", "green", "yellow", "blue", "purple", "aqua"];

		const form = document.createElement("form");

		const titleLabel = document.createElement("label");
		titleLabel.textContent = "Title:";
		const titleInput = document.createElement("input");
		titleInput.type = "text";
		titleInput.id = "title";
		titleInput.name = "title";
		titleInput.required = true;
		titleInput.minLength = 3;
		titleInput.maxLength = 50;

		const descriptionLabel = document.createElement("label");
		descriptionLabel.textContent = "Description:";
		const descriptionTextarea = document.createElement("textarea");
		descriptionTextarea.id = "description";
		descriptionTextarea.name = "description";
		descriptionTextarea.required = true;
		descriptionTextarea.minLength = 10;
		descriptionTextarea.maxLength = 200;

		const colorLabel = document.createElement("label");
		colorLabel.textContent = "Color:";
		const colorContainer = document.createElement("div");

		colorOptions.forEach((color) => {
			const checkbox = document.createElement("input");
			checkbox.type = "radio";
			checkbox.id = color;
			checkbox.name = "color";
			checkbox.value = color;

			const checkboxLabel = document.createElement("label");
			checkboxLabel.htmlFor = color;
			checkboxLabel.textContent = color;

			colorContainer.appendChild(checkbox);
			colorContainer.appendChild(checkboxLabel);
		});

		const submitButton = document.createElement("input");
		submitButton.type = "submit";
		submitButton.value = "Create";
		submitButton.addEventListener("click", (event) => {
			event.preventDefault();

			const title = document.getElementById("title").value;
			const description = document.getElementById("description").value;
			const color = document.querySelector("input[name='color']:checked");

			const newWorkspace = new workspace(title, description, color);
		});

		form.appendChild(titleLabel);
		form.appendChild(titleInput);
		form.appendChild(descriptionLabel);
		form.appendChild(descriptionTextarea);
		form.appendChild(colorLabel);
		form.appendChild(colorContainer);
		form.appendChild(submitButton);

		document.body.appendChild(form);
	};

	return { openWorkspace, displayWorkspaces, displayToolbar, openWorkspaceForm };
})();

/* harmony default export */ const dom = (Dom);
;// CONCATENATED MODULE: ./src/script.js







const noscript = document.querySelector(".noscript");
noscript.remove();

const generalWorkspace = new workspace("General", "A workspace for general todos", "#458588");
const exampleTodo = new todo("Example", "This is an example todo", "2023-10-25", 1, "#98971a");
generalWorkspace.todos.push(exampleTodo);
storage.workspaces.push(generalWorkspace);

dom.displayToolbar();
dom.displayWorkspaces();
dom.openWorkspace(generalWorkspace);
dom.openWorkspaceForm();
/******/ })()
;