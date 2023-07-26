"use strict";

import Storage from "./storage.js";
import Workspace from "./workspace.js";
import Todo from "./todo.js";

const Dom = (function () {
	const content = document.querySelector("#content");
	const toolbar = document.querySelector(".toolbar");
	const workspaces = document.querySelector(".workspaces");
	const todos = document.querySelector(".todos");

	const openWorkspace = (workspace) => {
		if (workspace) {
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
			Storage.currentWorkspace = workspace;
		}
		else {
			const noWorkspace = document.createElement("div");
			noWorkspace.classList.add("noWorkspace");
			noWorkspace.textContent = "No workspace selected";
			todos.appendChild(noWorkspace);
		}
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

	const displayToolbar = () => {
		const createWorkspace = document.createElement("button");
		createWorkspace.textContent = "Create workspace";
		createWorkspace.classList.add("createWorkspace");
		createWorkspace.addEventListener("click", () => {
			openWorkspaceForm();
		});
		toolbar.appendChild(createWorkspace);

		const createTodo = document.createElement("button");
		createTodo.textContent = "Create todo";
		createTodo.classList.add("createTodo");
		createTodo.addEventListener("click", () => {
			openTodoForm();
		});
		toolbar.appendChild(createTodo);

		if (Storage.currentWorkspace) {
			const deleteWorkspace = document.createElement("button");
			deleteWorkspace.textContent = "Delete workspace";
			deleteWorkspace.classList.add("deleteWorkspace");
			deleteWorkspace.addEventListener("click", () => {
				Storage.currentWorkspace.remove();
				openWorkspace();
			});
			toolbar.appendChild(deleteWorkspace);
		}
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

			const newWorkspace = new Workspace(title, description, color);
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

	const openTodoForm = () => {
		const colorOptions = ["red", "green", "yellow", "blue", "purple", "aqua"];

		const form = document.createElement("form");

		const titleLabel = document.createElement("label");
		titleLabel.htmlFor = "title";
		titleLabel.textContent = "Title:";

		const titleInput = document.createElement("input");
		titleInput.type = "text";
		titleInput.id = "title";
		titleInput.name = "title";
		titleInput.required = true;

		form.appendChild(titleLabel);
		form.appendChild(titleInput);

		const descriptionLabel = document.createElement("label");
		descriptionLabel.htmlFor = "description";
		descriptionLabel.textContent = "Description:";

		const descriptionInput = document.createElement("input");
		descriptionInput.type = "text";
		descriptionInput.id = "description";
		descriptionInput.name = "description";
		descriptionInput.required = true;

		form.appendChild(descriptionLabel);
		form.appendChild(descriptionInput);

		const dueDateLabel = document.createElement("label");
		dueDateLabel.htmlFor = "dueDate";
		dueDateLabel.textContent = "Due Date:";

		const dueDateInput = document.createElement("input");
		dueDateInput.type = "date";
		dueDateInput.id = "dueDate";
		dueDateInput.name = "dueDate";
		dueDateInput.required = true;

		form.appendChild(dueDateLabel);
		form.appendChild(dueDateInput);

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

		form.appendChild(colorContainer);

		const priorityLabel = document.createElement("label");
		priorityLabel.htmlFor = "priority";
		priorityLabel.textContent = "Priority:";

		const priorityInput = document.createElement("input");
		priorityInput.type = "number";
		priorityInput.id = "priority";
		priorityInput.name = "priority";
		priorityInput.min = 1;
		priorityInput.required = true;

		form.appendChild(priorityLabel);
		form.appendChild(priorityInput);

		const addChecklistBtn = document.createElement("button");
		addChecklistBtn.textContent = "Add Checklist Item";

		addChecklistBtn.onclick = () => {
			const newChecklistLabel = checklistLabel.cloneNode();
			const newChecklistInput = checklistInput.cloneNode();

			form.appendChild(newChecklistLabel);
			form.appendChild(newChecklistInput);
		};

		const checklistLabel = document.createElement("label");
		checklistLabel.htmlFor = "checklist";
		checklistLabel.textContent = "Checklist Item:";

		const checklistInput = document.createElement("input");
		checklistInput.type = "text";
		checklistInput.id = "checklist";
		checklistInput.name = "checklist";

		form.appendChild(addChecklistBtn);
		form.appendChild(checklistLabel);
		form.appendChild(checklistInput);

		const submitButton = document.createElement("input");
		submitButton.type = "submit";
		submitButton.value = "Submit";
		submitButton.addEventListener("click", (event) => {
			event.preventDefault();
			const title = document.getElementById("title").value;
			const description = document.getElementById("description").value;
			const dueDate = document.getElementById("dueDate").value;
			const color = document.querySelector("input[name='color']:checked");
			const priority = document.getElementById("priority").value;
			const checklistItems = Array.from(document.querySelectorAll("#checklist"));
			checklistItems.forEach((item) => {
				item = {
					title: item.value,
					status: false,
				};
			});
			const newTodo = new Todo(title, description, color, dueDate, priority, checklistItems);
			Storage.currentWorkspace.todos.push(newTodo);
			openWorkspace(Storage.currentWorkspace);
		});

		form.appendChild(submitButton);

		document.body.appendChild(form);
	};

	return { openWorkspace, displayWorkspaces, displayToolbar, openWorkspaceForm, openTodoForm };
})();

export default Dom;