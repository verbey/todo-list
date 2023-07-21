"use strict";

import Todo from "./modules/todo.js";
import Workspace from "./modules/workspace.js";
import Dom from "./modules/dom.js";
import Storage from "./modules/storage.js";

const noscript = document.querySelector(".noscript");
noscript.remove();

const generalWorkspace = new Workspace("General", "A workspace for general todos", "#458588");
Storage.workspaces.push(generalWorkspace);
Dom.displayWorkspaces();