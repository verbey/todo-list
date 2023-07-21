"use strict";

import Storage from './storage.js';

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
		Storage.workspaces.forEach((workspace) => {
			const workspaceElement = document.createElement("div");
			workspaceElement.classList.add("workspace");
			workspaceElement.textContent = workspace.title;
			workspaceElement.style.background = workspace.color;
			workspaces.appendChild(workspaceElement);
		});
	};
	return { openWorkspace, displayWorkspaces };
})();

export default Dom;