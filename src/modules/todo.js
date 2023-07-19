"use strict";

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

export default Todo;