import { projects } from "./fetchProjectsData.js"
import ProjectHandler from "./projectPost.js"

const projectsHandler = new ProjectHandler(document.getElementsByTagName("main")[0], projects[0])

