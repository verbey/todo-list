"use strict";

const Storage = (() => {
	let workspaces = [];
	let currentWorkspace;
	return { workspaces, currentWorkspace };
})();

export default Storage;