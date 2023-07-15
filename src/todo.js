"use strict";

class Todo {
	constructor(title, description, dueDate, priority, checklistItems, color) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.checklistItems = checklistItems;
		this.color = color;
	}
}

export default Todo;