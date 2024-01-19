const response = await fetch(`${window.location}/assets/data/projects.json`)
const projects = await response.json()
document.getElementsByTagName("main")[0].textContent = JSON.stringify(projects)