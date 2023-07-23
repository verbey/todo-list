"use strict";

import Storage from "./storage";

class Workspace {
	constructor(title, description, color, todos) {
		this.title = title;
		this.description = description;
		this.color = color;
		if (todos === undefined) this.todos = [];
		else this.todos = todos;

		Storage.workspaces.push(this);
	}
}

export default Workspace;