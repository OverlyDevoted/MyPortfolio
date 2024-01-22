import { projects } from "./fetchProjectsData.js"
import ProjectHandler from "./projectPost.js"

const projectsHandler = new ProjectHandler(document.getElementsByTagName("main")[0], projects[0])

let counter = 0;
setInterval(() => {
    projectsHandler.loadPost(projects[counter]);
    counter = (counter + 1) % projects.length;
}, 3000)
