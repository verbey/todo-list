"use strict";

import Storage from './storage.js';

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
		Storage.workspaces.forEach((workspace) => {
			const workspaceElement = document.createElement("div");
			workspaceElement.classList.add("workspace");
			workspaceElement.textContent = workspace.title;
			workspaces.appendChild(workspaceElement);
		});
	};
	return { openWorkspace, displayWorkspaces };
})();

export default Dom;