"use strict";

import Workspace from "./workspace.js";

const Storage = (() => {
	let workspaces = [];
	let currentWorkspace;
	const saveAll = () => {
		if (workspaces) localStorage.setItem("workspaces", JSON.stringify(workspaces));
	};
	const loadAll = () => {
		if (localStorage.getItem("workspaces") !== null) {
			const parsedWorkspaces = JSON.parse(localStorage.getItem("workspaces"));
			parsedWorkspaces.forEach((workspace) => {
				const newWorkspace = new Workspace(workspace.title, workspace.description, workspace.color, workspace.todos);
			});
		}
	};
	return { workspaces, currentWorkspace, saveAll, loadAll };
})();

export default Storage;