"use strict";

class Workspace {
	constructor(title, description, color, todos) {
		this.title = title;
		this.description = description;
		this.color = color;
		if (todos === undefined) this.todos = [];
		else this.todos = todos;
	}
}

export default Workspace;