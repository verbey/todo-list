"use strict";

class Todo {
	constructor(title, description, dueDate, priority, color, checklistItems, completed) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.color = color;
		if (checklistItems === undefined) this.checklistItems = [];
		else this.checklistItems = checklistItems;
		if (completed === undefined) this.completed = false;
		else this.completed = completed;
	}
}

export default Todo;