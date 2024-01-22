const response = await fetch(`${window.location}/assets/data/projects.json`)
export const projects = await response.json()
projects.sort((a, b) => a.id - b.id)