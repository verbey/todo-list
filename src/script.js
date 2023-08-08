"use strict";

import Todo from "./modules/todo.js";
import Workspace from "./modules/workspace.js";
import Dom from "./modules/dom.js";
import Storage from "./modules/storage.js";

const noscript = document.querySelector(".noscript");
noscript.remove();

if (localStorage.getItem("notFirstRun")) {
	Storage.loadAll();
	Dom.updateDisplay();
}

else {
	localStorage.setItem("notFirstRun", true);
	const generalWorkspace = new Workspace("General", "A workspace for general todos", "aqua");
	const exampleTodo = new Todo("Example", "This is an example todo", "2023-10-25", 1, "yellow");
	generalWorkspace.todos.push(exampleTodo);

	Storage.currentWorkspace = generalWorkspace;
	Dom.updateDisplay();
}
