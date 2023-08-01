"use strict";

import Storage from "./storage.js";
import Workspace from "./workspace.js";
import Todo from "./todo.js";

const Dom = (() => {
	const content = document.querySelector("#content");
	const toolbar = document.querySelector(".toolbar");
	const workspaces = document.querySelector(".workspaces");
	const todos = document.querySelector(".todos");

	const displayTodos = () => {
		const todosArr = Array.from(todos.children);
		todosArr.forEach((todo) => {
			todo.remove();
		});

		if (Storage.currentWorkspace) {
			Storage.currentWorkspace.todos.forEach((todo) => {
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

				const todoBtns = document.createElement("div");

				const deleteBtn = document.createElement("button");
				deleteBtn.value = "delete";
				deleteBtn.textContent = "Delete";
				deleteBtn.addEventListener("click", (event) => {
					const todosArr = Array.from(todos.children);
					const index = todosArr.indexOf(event.target.parentNode.parentNode);
					Storage.currentWorkspace.todos.splice(index, 1);
					updateDisplay();
				});

				const editBtn = document.createElement("button");
				editBtn.value = "edit";
				editBtn.textContent = "Edit";
				editBtn.addEventListener("click", () => {
					openTodoForm(todo);
				});

				todoBtns.appendChild(deleteBtn);
				todoBtns.appendChild(editBtn);

				todoCont.appendChild(todoBtns);

				todos.appendChild(todoCont);
			});
		}
		else {
			const noWorkspace = document.createElement("div");
			noWorkspace.classList.add("noWorkspace");
			noWorkspace.textContent = "No workspace selected";
			todos.appendChild(noWorkspace);
		}
	};
	const displayWorkspaces = () => {
		const workspacesArr = Array.from(workspaces.children);
		workspacesArr.forEach((workspace) => {
			workspace.remove();
		});

		Storage.workspaces.forEach((workspace) => {
			const workspaceCont = document.createElement("div");

			const workspaceElement = document.createElement("div");
			workspaceElement.classList.add("workspace");
			workspaceElement.textContent = workspace.title;
			workspaceElement.style.background = workspace.color;
			workspaceCont.appendChild(workspaceElement);
			workspaceElement.addEventListener("click", () => {
				Storage.currentWorkspace = workspace;
				updateDisplay();
			});

			const deleteBtn = document.createElement("button");
			deleteBtn.value = "delete";
			deleteBtn.textContent = "Delete";
			workspaceCont.appendChild(deleteBtn);
			deleteBtn.addEventListener("click", () => {
				workspace.remove();
				updateDisplay();
			});

			const editBtn = document.createElement("button");
			editBtn.value = "edit";
			editBtn.textContent = "Edit";
			workspaceCont.appendChild(editBtn);
			editBtn.addEventListener("click", () => {
				openWorkspaceForm(workspace);
			});

			workspaces.appendChild(workspaceCont);
		});
	};

	const displayToolbar = () => {
		const toolbarArr = Array.from(toolbar.children);
		toolbarArr.forEach((button) => {
			button.remove();
		});
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
				updateDisplay();
			});
			toolbar.appendChild(deleteWorkspace);
		}
	};

	const openWorkspaceForm = (workspace) => {
		removeForms();
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

		if (workspace) {
			titleInput.value = workspace.title;
			descriptionTextarea.value = workspace.description;
			colorOptions.forEach(option => {
				if (workspace.color === option) {
					document.getElementById(option).checked = true;
				}
			});
		}

		const submitButton = document.createElement("input");
		submitButton.type = "submit";
		submitButton.value = "Create";
		submitButton.addEventListener("click", (event) => {
			event.preventDefault();

			const title = document.getElementById("title").value;
			const description = document.getElementById("description").value;
			const color = document.querySelector("input[name='color']:checked");

			if (workspace) {
				workspace.title = title;
				workspace.description = description;
				workspace.color = color;
			}
			else {
				const newWorkspace = new Workspace(title, description, color);
			}
			updateDisplay();
		});

		form.appendChild(titleLabel);
		form.appendChild(titleInput);
		form.appendChild(descriptionLabel);
		form.appendChild(descriptionTextarea);
		form.appendChild(colorLabel);
		form.appendChild(colorContainer);
		form.appendChild(submitButton);

		const overlay = document.createElement("div");
		overlay.classList.add("overlay");
		overlay.appendChild(form);

		document.body.appendChild(overlay);
	};

	const openTodoForm = (todo) => {
		removeForms();
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

		if (todo) {
			titleInput.value = todo.title;
			descriptionInput.value = todo.description;
			dueDateInput.value = todo.dueDate;
			priorityInput.value = todo.value;
		}

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
			if (todo) {
				todo.title = title;
				todo.description = description;
				todo.dueDate = dueDate;
				todo.color = color;
				todo.priority = priority;
				todo.checklistItems = checklistItems;
				updateDisplay();
			}
			else {
				checklistItems.forEach((item) => {
					item = {
						title: item.value,
						status: false,
					};
				});
				const newTodo = new Todo(title, description, color, dueDate, priority, checklistItems);
				Storage.currentWorkspace.todos.push(newTodo);
				updateDisplay();
			}
		});

		form.appendChild(submitButton);

		const overlay = document.createElement("div");
		overlay.classList.add("overlay");
		overlay.appendChild(form);

		document.body.appendChild(overlay);
	};

	const removeForms = () => {
		const overlay = document.querySelector(".overlay");
		if (overlay) overlay.remove();
	};

	const updateDisplay = () => {
		removeForms();
		displayWorkspaces();
		displayTodos();
		displayToolbar();

		Storage.saveAll();
	};

	return { displayTodos, displayWorkspaces, displayToolbar, openWorkspaceForm, openTodoForm, removeForms, updateDisplay };
})();

export default Dom;