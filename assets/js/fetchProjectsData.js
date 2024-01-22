const response = await fetch(`${window.origin}/assets/data/projects.json`)
export const projects = await response.json()
projects.sort((a, b) => a.id - b.id)